import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class RandomUserService {
  constructor(private readonly httpService: HttpService) {}

  async fetchRandomUser(): Promise<CreateUserDto> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get('https://randomuser.me/api/', {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
              Accept: 'application/json',
            },
          })
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
    } catch (error) {
      console.warn('⚠️ randomuser.me недоступний → fallback на faker');

      return {
        name: faker.person.fullName(),
        gender: faker.person.sexType(),
        email: faker.internet.email(),
        location: {
          city: faker.location.city(),
          country: faker.location.country(),
          latitude: Number(faker.location.latitude()),
          longitude: Number(faker.location.longitude()),
        },
        picture: faker.image.avatar(),
      };
    }
  }
}
