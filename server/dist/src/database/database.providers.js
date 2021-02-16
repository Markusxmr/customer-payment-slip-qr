"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            var _a, _b, _c, _d;
            return await typeorm_1.createConnection({
                type: 'postgres',
                host: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : '127.0.0.1',
                port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
                username: (_b = process.env.DB_USERNAME) !== null && _b !== void 0 ? _b : 'postgres',
                password: (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : 'postgres',
                database: (_d = process.env.DB_DATABASE) !== null && _d !== void 0 ? _d : 'transactor_dev',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            });
        },
    },
];
//# sourceMappingURL=database.providers.js.map