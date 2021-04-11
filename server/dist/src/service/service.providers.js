"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceProviders = void 0;
const isp_entity_1 = require("../entities/isp.entity");
const customer_entity_1 = require("../entities/customer.entity");
const payment_slip_entity_1 = require("../entities/payment-slip.entity");
const global_setting_entity_1 = require("../entities/global-setting.entity");
const user_entity_1 = require("../entities/user.entity");
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
    {
        provide: 'USER_REPOSITORY',
        useFactory: (connection) => connection.getRepository(user_entity_1.User),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'GLOBAL_SETTING_REPOSITORY',
        useFactory: (connection) => connection.getRepository(global_setting_entity_1.GlobalSetting),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=service.providers.js.map