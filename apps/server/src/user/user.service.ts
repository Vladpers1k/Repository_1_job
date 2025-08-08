import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users: CreateUserDto[] = [];

  create(user: CreateUserDto) {
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }
}
