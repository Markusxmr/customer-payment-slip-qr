import { Global, Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { CustomerService } from './services/customer.service';
import { IspService } from './services/isp.service';
import { GlobalSettingService } from './services/global-setting.service';
import { PaymentSlipService } from './services/payment-slip.service';
import { repositoryProviders } from './repository.providers';

@Global()
@Module({
  imports: [ApiModule, AuthModule, DatabaseModule],
  providers: [
    AuthService,
    UserService,
    PaymentSlipService,
    CustomerService,
    IspService,
    GlobalSettingService,
    ...repositoryProviders,
  ],
  exports: [
    ApiModule,
    AuthModule,
    DatabaseModule,
    UserService,
    PaymentSlipService,
    CustomerService,
    IspService,
    GlobalSettingService,
    ...repositoryProviders,
  ],
})
export class AppModule {}
