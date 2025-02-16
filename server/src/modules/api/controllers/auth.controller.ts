import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../../services/auth.service';
import { Public } from '../../../decorators/public.decorator';
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
