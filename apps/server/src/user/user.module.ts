import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [WeatherModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
