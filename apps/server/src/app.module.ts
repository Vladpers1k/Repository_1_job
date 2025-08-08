import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [UserModule, WeatherModule],
})
export class AppModule {}
