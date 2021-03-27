import { Module } from '@nestjs/common';
import { IspController } from './controllers/isp.controller';
import { PaymentSlipController } from './controllers/payment-slip.controller';
import { CustomerController } from './controllers/customer.controller';
import { GlobalSettingController } from './controllers/global-setting.controller';
import { CustomerResolver } from './resolvers/customer.resolver';
import { PaymentSlipResolver } from './resolvers/payment-slip.resolver';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [PaymentSlipController, CustomerController, IspController, GlobalSettingController],
  providers: [ServiceModule, PaymentSlipResolver, CustomerResolver],
  exports: [PaymentSlipResolver, CustomerResolver],
})
export class ApiModule {}
