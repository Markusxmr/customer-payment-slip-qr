"use strict";
exports.__esModule = true;
exports.serviceProviders = void 0;
var user_entity_1 = require("../entities/user.entity");
var payment_slip_entity_1 = require("../entities/payment-slip.entity");
exports.serviceProviders = [
    {
        provide: 'PAYMENT_SLIP_REPOSITORY',
        useFactory: function (connection) {
            return connection.getRepository(payment_slip_entity_1.PaymentSlip);
        },
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: 'USER_REPOSITORY',
        useFactory: function (connection) { return connection.getRepository(user_entity_1.User); },
        inject: ['DATABASE_CONNECTION']
    },
];
