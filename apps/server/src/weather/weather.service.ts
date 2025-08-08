import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeather(
    latitude: number,
    longitude: number,
  ): Promise<{
    temperature: number;
    min: number;
    max: number;
  }> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`;

    const { data } = await this.httpService.axiosRef.get(url);

    const temperatures: number[] = data.hourly?.temperature_2m || [];

    return {
      temperature: data.current_weather?.temperature ?? 0,
      min: temperatures.length ? Math.min(...temperatures) : 0,
      max: temperatures.length ? Math.max(...temperatures) : 0,
    };
  }
}
