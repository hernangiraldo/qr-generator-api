import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

  @Post('login')
  login(@Body() body: AuthDto) {
    console.log(body);
    return this.authSvc.validateUser(body.email, body.password);
  }

  @Put('logout')
  logout() {
    return this.authSvc.logout('pepew@bhd.com.do');
  }
}
