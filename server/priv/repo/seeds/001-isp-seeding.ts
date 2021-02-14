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
          name: 'TEHNICORE d.o.o.',
          street: 'Zrinski Trg 4',
          postalCode: 47300,
          city: 'Ogulin',
          oib: 60472483107,
          iban: 'HR2224020061100294882',
        },
        {
          name: 'GENEX d.o.o.',
          street: 'Zrinski Trg 4',
          postalCode: 47300,
          city: 'Ogulin',
          oib: 17751264789,
          iban: 'HR3823900011101044344',
        },
      ])
      .execute();
  }
}
