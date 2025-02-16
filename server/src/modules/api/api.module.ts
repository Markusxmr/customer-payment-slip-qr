import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { IspController } from './controllers/isp.controller';
import { PaymentSlipController } from './controllers/payment-slip.controller';
import { CustomerController } from './controllers/customer.controller';
import { GlobalSettingController } from './controllers/global-setting.controller';
import { CustomerResolver } from './resolvers/customer.resolver';
import { PaymentSlipResolver } from './resolvers/payment-slip.resolver';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AppController } from '../../app.controller';

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    AuthController,
    UserController,
    PaymentSlipController,
    CustomerController,
    IspController,
    GlobalSettingController,
  ],
  providers: [
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
