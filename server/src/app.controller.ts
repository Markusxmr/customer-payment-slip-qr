import { Controller, Get } from '@nestjs/common';
import { AppDataSource } from './modules/database/database.providers';
import { User } from './entities/user.entity';
import { log } from 'console';
import { Isp } from './entities/isp.entity';
import { GlobalSetting } from './entities/global-setting.entity';
import { Customer } from './entities/customer.entity';
import { PaymentSlip } from './entities/payment-slip.entity';

@Controller()
export class AppController {
  constructor() {}

  async onModuleInit() {
    // /* const globalSettings = await AppDataSource.getRepository(GlobalSetting).find();
    // const isps = await AppDataSource.getRepository(Isp).find();
    // const users = await AppDataSource.getRepository(User).find();
    // const customers = await AppDataSource.getRepository(Customer).find();
    // const paymentSlips = await AppDataSource.getRepository(PaymentSlip).find();
    // await SqliteAppDataSource.getRepository(GlobalSetting).save(globalSettings);
    // await SqliteAppDataSource.getRepository(Isp).save(isps);
    // await SqliteAppDataSource.getRepository(User).save(users);
    // await SqliteAppDataSource.getRepository(Customer).save(customers);
    // await SqliteAppDataSource.getRepository(PaymentSlip).save(paymentSlips); */
  }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
