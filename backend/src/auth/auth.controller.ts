import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    const user = await this.authService.register(body.name, body.email, body.password);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }) {
    const { user, access_token } = await this.authService.login(body.email, body.password);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      access_token,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return { message: 'Logout realizado com sucesso' };
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verify(@Request() req) {
    return {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    };
  }
}
