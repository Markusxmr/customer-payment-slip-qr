import { Connection, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PaymentSlip } from '../entities/payment-slip.entity';

export const serviceProviders = [
  {
    provide: 'PAYMENT_SLIP_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(PaymentSlip),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];
