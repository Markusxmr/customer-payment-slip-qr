import { Module } from '@nestjs/common';
import { PaymentSlipResolver } from './resolvers/payment-slip.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { PaymentSlipController } from './controllers/payment-slip.controller';
import { CustomerController } from './controllers/customer.controller';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [PaymentSlipController, CustomerController],
  providers: [ServiceModule, PaymentSlipResolver, CustomerResolver],
  exports: [PaymentSlipResolver, CustomerResolver],
})
export class ApiModule {}
