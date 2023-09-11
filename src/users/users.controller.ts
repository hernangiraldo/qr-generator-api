import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userSvc: UsersService) {}

  @Post()
  create(@Body() body: RegisterUserDto) {
    return this.userSvc.create(body);
  }
}
