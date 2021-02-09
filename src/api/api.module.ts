import { Module } from '@nestjs/common';
import { PaymentSlipResolver } from './resolvers/payment-slip.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { PaymentSlipController } from './controllers/payment-slip.controller';
import { UserController } from './controllers/user.controller';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [PaymentSlipController, UserController],
  providers: [ServiceModule, PaymentSlipResolver, UserResolver],
  exports: [PaymentSlipResolver, UserResolver],
})
export class ApiModule {}
