"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            var _a;
            return await (0, typeorm_1.createConnection)({
                type: 'better-sqlite3',
                database: (_a = process.env.DB_DATABASE) !== null && _a !== void 0 ? _a : 'transactor_dev',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            });
        },
    },
];
//# sourceMappingURL=database.providers.js.map