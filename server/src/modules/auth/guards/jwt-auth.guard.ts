import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject('JwtService') private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) throw err || new UnauthorizedException();
    return user;
  }

  user(request: any) {
    const token = request?.headers?.authorization?.replace('Bearer ', '');
    if (!token) return null;
    const decoded = this.jwtService.decode(token);
    return { username: decoded['username'], id: decoded['id'] };
  }
}
