"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isp_entity_1 = require("../../../src/entities/isp.entity");
class CreateIsps {
    async run(factory, connection) {
        await connection
            .createQueryBuilder()
            .insert()
            .into(isp_entity_1.Isp)
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
exports.default = CreateIsps;
//# sourceMappingURL=001-isp-seeding.js.map