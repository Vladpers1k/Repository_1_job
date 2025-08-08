import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeather(latitude: number, longitude: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`;

    const { data } = await this.httpService.axiosRef.get(url);

    return {
      latitude,
      longitude,
      current: data.current_weather,
      hourly: data.hourly.temperature_2m,
    };
  }
}
