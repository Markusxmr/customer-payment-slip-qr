import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { IspController } from './controllers/isp.controller';
import { PaymentSlipController } from './controllers/payment-slip.controller';
import { CustomerController } from './controllers/customer.controller';
import { GlobalSettingController } from './controllers/global-setting.controller';
import { CustomerResolver } from './resolvers/customer.resolver';
import { PaymentSlipResolver } from './resolvers/payment-slip.resolver';
import { ServiceModule } from '../service/service.module';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from '../service/services/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [ServiceModule, AuthModule],
  controllers: [
    AuthController,
    UserController,
    PaymentSlipController,
    CustomerController,
    IspController,
    GlobalSettingController,
  ],
  providers: [
    AuthService,
    PaymentSlipResolver,
    CustomerResolver,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class ApiModule {}
