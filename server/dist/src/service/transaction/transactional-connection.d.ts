import { Connection, EntitySchema, ObjectType, Repository } from 'typeorm';
export declare class TransactionalConnection {
    private connection;
    constructor(connection: Connection);
    get rawConnection(): Connection;
    getRepository<Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity>;
}
