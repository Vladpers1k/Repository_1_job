import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class RandomUserService {
  constructor(private readonly httpService: HttpService) {}

  async fetchRandomUser(): Promise<CreateUserDto> {
    const response = await firstValueFrom(
      this.httpService
        .get('https://randomuser.me/api/')
        .pipe(map((resp) => resp.data)),
    );

    const userData = response.results?.[0];
    if (!userData) {
      throw new Error('randomuser.me returned no results');
    }

    return {
      name: `${userData.name.first} ${userData.name.last}`,
      gender: userData.gender,
      email: userData.email,
      location: {
        city: userData.location.city,
        country: userData.location.country,
        latitude: Number(userData.location.coordinates.latitude),
        longitude: Number(userData.location.coordinates.longitude),
      },
      picture: userData.picture.large,
    };
  }
}
