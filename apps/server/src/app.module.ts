import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
