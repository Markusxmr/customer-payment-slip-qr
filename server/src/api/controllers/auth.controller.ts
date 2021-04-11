import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../service/services/auth.service';
import { Public } from '../config/decorators';
import { LoginDto } from '../dto/auth/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
