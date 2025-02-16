import { DataSource } from 'typeorm';
import { Customer } from '../../entities/customer.entity';
import { GlobalSetting } from '../../entities/global-setting.entity';
import { Isp } from '../../entities/isp.entity';
import { PaymentSlip } from '../../entities/payment-slip.entity';
import { User } from '../../entities/user.entity';

const entities = [Customer, GlobalSetting, Isp, PaymentSlip, User];

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_DATABASE ?? 'transactor_dev',
  entities,
  synchronize: false,
});

export const _AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities,
  synchronize: false,
});

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }

      return AppDataSource;
    },
  },
];
