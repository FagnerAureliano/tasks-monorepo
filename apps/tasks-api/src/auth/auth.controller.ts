import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service'; 
import { LocalAuthGuard } from './strategy/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user);
    
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

}
