import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WeatherService } from '../weather/weather.service';

@Module({
  controllers: [UserController],
  providers: [UserService, WeatherService],
})
export class UserModule {}
