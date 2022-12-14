import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { IspService } from './services/isp.service';
import { GlobalSettingService } from './services/global-setting.service';
import { PaymentSlipService } from './services/payment-slip.service';
import { serviceProviders } from './service.providers';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './services/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, PaymentSlipService, CustomerService, IspService, GlobalSettingService, ...serviceProviders],
  exports: [UserService, PaymentSlipService, CustomerService, IspService, GlobalSettingService, ...serviceProviders],
})
export class ServiceCoreModule {}

@Module({
  imports: [ServiceCoreModule],
  providers: [ServiceCoreModule],
  exports: [ServiceCoreModule],
})
export class ServiceModule {}
