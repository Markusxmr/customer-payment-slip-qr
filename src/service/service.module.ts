import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PaymentSlipService } from './services/payment-slip.service';
import { serviceProviders } from './service.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PaymentSlipService, UserService, ...serviceProviders],
  exports: [PaymentSlipService, UserService, ...serviceProviders],
})
export class ServiceCoreModule {}

@Module({
  imports: [ServiceCoreModule],
  providers: [ServiceCoreModule],
  exports: [ServiceCoreModule],
})
export class ServiceModule {}
