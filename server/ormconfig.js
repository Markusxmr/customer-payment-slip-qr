const NODE_ENV = process.env.NODE_ENV;
const DB_HOST = process.env.DB_HOST ?? '127.0.0.1';

const baseEntity = 'src/entities/**/*.entity.ts';

const shared = {
  type: 'postgres',
  port: 5432,
  entities: [`**/*.entity.ts`],
  migrationsTableName: 'migrations',
  migrations: ['priv/repo/migrations/*.ts'],
  cli: {
    migrationsDir: 'priv/repo/migrations',
  },
  ssl: false,
};

const dev = {
  host: DB_HOST,
  username: 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: 'transactor_dev',
  ...shared,
};

const prod = {
  host: DB_HOST,
  username: 'postgres',
  password: 'ogulin1808',
  database: 'transactor',
  ...shared,
};

switch (NODE_ENV) {
  case 'dev':
    module.exports = dev;
    break;

  case 'prod':
    module.exports = prod;
    break;

  default:
    module.exports = dev;
    break;
}
