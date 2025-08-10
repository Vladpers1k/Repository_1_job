import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WeatherModule } from '../weather/weather.module';
import { RandomUserService } from './random-user.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [WeatherModule, HttpModule],
  controllers: [UserController],
  providers: [UserService, RandomUserService],
})
export class UserModule {}
