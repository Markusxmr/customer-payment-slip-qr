import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../api/dto/auth/login.dto';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto?.username, loginDto?.password);
    if (!user) throw new UnauthorizedException('Korisničko ime ili zaporka netočna');

    const userForJwt = {
      id: user?.id,
      username: user.username,
    };

    const token = this.jwtService.sign(userForJwt, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = this.jwtService.sign(userForJwt, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });

    return {
      user: userForJwt,
      token,
      refreshToken,
    };
  }
}
