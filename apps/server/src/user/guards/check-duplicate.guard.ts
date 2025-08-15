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

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { email } = request.body;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const exists = this.userService
      .findAllSaved()
      .some((user) => user.email === email);

    if (exists) {
      throw new BadRequestException('User already saved');
    }

    return true;
  }
}
