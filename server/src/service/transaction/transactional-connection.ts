import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntityManager,
  EntitySchema,
  FindOneOptions,
  FindOptionsUtils,
  getRepository,
  ObjectType,
  Repository,
} from 'typeorm';

/**
 * @description
 * The TransactionalConnection is a wrapper around the TypeORM `Connection` object which works in conjunction
 * with the {@link Transaction} decorator to implement per-request transactions. All services which access the
 * database should use this class rather than the raw TypeORM connection, to ensure that db changes can be
 * easily wrapped in transactions when required.
 *
 * The service layer does not need to know about the scope of a transaction, as this is covered at the
 * API by the use of the `Transaction` decorator.
 *
 * @docsCategory data-access
 */
@Injectable()
export class TransactionalConnection {
  constructor(@InjectConnection() private connection: Connection) {}

  /**
   * @description
   * The plain TypeORM Connection object. Should be used carefully as any operations
   * performed with this connection will not be performed within any outer
   * transactions.
   */
  get rawConnection(): Connection {
    return this.connection;
  }

  /**
   * @description
   * Returns a TypeORM repository. Note that when no RequestContext is supplied, the repository will not
   * be aware of any existing transaction. Therefore calling this method without supplying a RequestContext
   * is discouraged without a deliberate reason.
   */
  getRepository<Entity>(
    target: ObjectType<Entity> | EntitySchema<Entity> | string,
  ): Repository<Entity>;
  /**
   * @description
   * Returns a TypeORM repository which is bound to any existing transactions. It is recommended to _always_ pass
   * the RequestContext argument when possible, otherwise the queries will be executed outside of any
   * ongoing transactions which have been started by the {@link Transaction} decorator.
   */
  getRepository<Entity>(
    target: ObjectType<Entity> | EntitySchema<Entity> | string,
  ): Repository<Entity> {
    return getRepository(target!);
  }
}
