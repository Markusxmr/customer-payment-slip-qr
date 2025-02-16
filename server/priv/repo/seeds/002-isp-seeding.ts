import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { Isp } from '../../../src/entities/isp.entity';

export default class CreateIsps implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    await dataSource
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
