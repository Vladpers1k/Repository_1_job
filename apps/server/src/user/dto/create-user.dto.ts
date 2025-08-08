import { IsString, IsEmail, IsObject, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  gender: string;

  @IsEmail()
  email: string;

  @IsObject()
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };

  @IsString()
  picture: string;
}
