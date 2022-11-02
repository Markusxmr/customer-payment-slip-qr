import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Isp } from '../../../src/entities/isp.entity';

export default class CreateIsps implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Isp)
      .values([
        {
          name: 'Company d.o.o.',
          street: 'Street Address',
          postalCode: 47300,
          city: 'Ogulin',
          oib: 50472483107,
          iban: 'HR1224020061100294882',
          defaultIsp: true,
        },
      ])
      .execute();
  }
}
