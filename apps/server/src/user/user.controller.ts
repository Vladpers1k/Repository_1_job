import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { RandomUserService } from './random-user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly randomUserService: RandomUserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Post('random')
  async createRandomUser(): Promise<User> {
    const randomUserDto = await this.randomUserService.fetchRandomUser();
    return this.userService.create(randomUserDto);
  }
}
