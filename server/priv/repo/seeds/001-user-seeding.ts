import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../../src/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
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
