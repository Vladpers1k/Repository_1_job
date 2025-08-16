import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckDuplicateGuard } from './guards/check-duplicate.guard';
import { User } from './user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(CheckDuplicateGuard)
  saveUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.saveUser(createUserDto);
  }

  @Get()
  async getSavedUsers(): Promise<User[]> {
    return this.userService.findAllSaved();
  }

  @Post('random')
  async getRandomUser() {
    return this.userService.generateRandomUser();
  }

  @Delete(':email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
}
