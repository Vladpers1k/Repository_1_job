import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { WeatherService } from '../weather/weather.service';
import { User } from './user.model';
import { RandomUserService } from './random-user.service';

@Injectable()
export class UserService {
  private savedUsers: User[] = []; // тільки для збережених

  constructor(
    private weatherService: WeatherService,
    private randomUserService: RandomUserService,
  ) {}

  async saveUser(userDto: CreateUserDto): Promise<User> {
    const latitude = Number(userDto.location.latitude);
    const longitude = Number(userDto.location.longitude);
    const weather = await this.weatherService.getWeather(latitude, longitude);

    const user: User = {
      name: userDto.name,
      gender: userDto.gender,
      email: userDto.email,
      location: {
        city: userDto.location.city,
        country: userDto.location.country,
        latitude,
        longitude,
      },
      picture: userDto.picture,
      weather,
    };

    this.savedUsers.push(user);
    return user;
  }

  async generateRandomUser(): Promise<User> {
    while (true) {
      const randomUserDto = await this.randomUserService.fetchRandomUser();
      const alreadySaved = this.savedUsers.some(
        (u) => u.email === randomUserDto.email,
      );
      if (!alreadySaved) {
        const latitude = Number(randomUserDto.location.latitude);
        const longitude = Number(randomUserDto.location.longitude);
        const weather = await this.weatherService.getWeather(
          latitude,
          longitude,
        );
        return { ...randomUserDto, weather };
      }
    }
  }

  findAllSaved(): User[] {
    return this.savedUsers;
  }

  deleteUser(email: string): { message: string } {
    const index = this.savedUsers.findIndex((user) => user.email === email);
    if (index === -1) {
      return { message: 'User not found' };
    }
    this.savedUsers.splice(index, 1);
    return { message: 'User deleted successfully' };
  }
}
