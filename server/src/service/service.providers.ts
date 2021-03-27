import { Connection } from 'typeorm';
import { Isp } from '../entities/isp.entity';
import { Customer } from '../entities/customer.entity';
import { PaymentSlip } from '../entities/payment-slip.entity';
import { GlobalSetting } from '../entities/global-setting.entity';

export const serviceProviders = [
  {
    provide: 'PAYMENT_SLIP_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(PaymentSlip),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Customer),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ISP_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Isp),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'GLOBAL_SETTING_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(GlobalSetting),
    inject: ['DATABASE_CONNECTION'],
  },
];
