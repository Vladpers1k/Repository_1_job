import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { WeatherService } from '../weather/weather.service';
import { User } from './user.model';
import { RandomUserService } from './random-user.service';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(
    private weatherService: WeatherService,
    private randomUserService: RandomUserService,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
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

    this.users.push(user);
    return user;
  }

  async createRandom(): Promise<User> {
    const randomUserDto = await this.randomUserService.fetchRandomUser();
    return this.create(randomUserDto);
  }

  findAll(): User[] {
    return this.users;
  }
}
