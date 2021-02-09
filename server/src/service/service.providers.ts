import { Connection, Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { PaymentSlip } from '../entities/payment-slip.entity';

export const serviceProviders = [
  {
    provide: 'PAYMENT_SLIP_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(PaymentSlip),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Customer),
    inject: ['DATABASE_CONNECTION'],
  },
];
