import { DataSource } from 'typeorm';
import { Isp } from './entities/isp.entity';
import { Customer } from './entities/customer.entity';
import { PaymentSlip } from './entities/payment-slip.entity';
import { GlobalSetting } from './entities/global-setting.entity';
import { User } from './entities/user.entity';

export const repositoryProviders = [
  {
    provide: 'PAYMENT_SLIP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentSlip),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ISP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Isp),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'GLOBAL_SETTING_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(GlobalSetting),
    inject: ['DATABASE_CONNECTION'],
  },
];
