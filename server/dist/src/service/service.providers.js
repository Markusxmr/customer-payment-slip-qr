"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceProviders = void 0;
const isp_entity_1 = require("../entities/isp.entity");
const customer_entity_1 = require("../entities/customer.entity");
const payment_slip_entity_1 = require("../entities/payment-slip.entity");
exports.serviceProviders = [
    {
        provide: 'PAYMENT_SLIP_REPOSITORY',
        useFactory: (connection) => connection.getRepository(payment_slip_entity_1.PaymentSlip),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'CUSTOMER_REPOSITORY',
        useFactory: (connection) => connection.getRepository(customer_entity_1.Customer),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'ISP_REPOSITORY',
        useFactory: (connection) => connection.getRepository(isp_entity_1.Isp),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=service.providers.js.map