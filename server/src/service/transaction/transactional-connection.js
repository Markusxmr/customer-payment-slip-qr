"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.TransactionalConnection = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
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
var TransactionalConnection = /** @class */ (function () {
    function TransactionalConnection(connection) {
        this.connection = connection;
    }
    Object.defineProperty(TransactionalConnection.prototype, "rawConnection", {
        /**
         * @description
         * The plain TypeORM Connection object. Should be used carefully as any operations
         * performed with this connection will not be performed within any outer
         * transactions.
         */
        get: function () {
            return this.connection;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description
     * Returns a TypeORM repository which is bound to any existing transactions. It is recommended to _always_ pass
     * the RequestContext argument when possible, otherwise the queries will be executed outside of any
     * ongoing transactions which have been started by the {@link Transaction} decorator.
     */
    TransactionalConnection.prototype.getRepository = function (target) {
        return typeorm_2.getRepository(target);
    };
    TransactionalConnection = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectConnection())
    ], TransactionalConnection);
    return TransactionalConnection;
}());
exports.TransactionalConnection = TransactionalConnection;
