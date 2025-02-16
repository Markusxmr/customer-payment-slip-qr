import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from '../../../src/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
          email: process.env.ADMIN_EMAIL,
        },
      ])
      .execute();
  }
}
