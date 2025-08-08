import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { WeatherService } from '../weather/weather.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(private weatherService: WeatherService) {}

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

  findAll(): User[] {
    return this.users;
  }
}
