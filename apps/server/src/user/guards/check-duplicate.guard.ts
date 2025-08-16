import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class CheckDuplicateGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email } = request.body;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const users = await this.userService.findAllSaved();

    const exists = users.some((user) => user.email === email);

    if (exists) {
      throw new BadRequestException('User already saved');
    }

    return true;
  }
}
