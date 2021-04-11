"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModule = exports.ServiceCoreModule = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("./services/customer.service");
const isp_service_1 = require("./services/isp.service");
const global_setting_service_1 = require("./services/global-setting.service");
const payment_slip_service_1 = require("./services/payment-slip.service");
const service_providers_1 = require("./service.providers");
const database_module_1 = require("../database/database.module");
const user_service_1 = require("./services/user.service");
let ServiceCoreModule = class ServiceCoreModule {
};
ServiceCoreModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        providers: [user_service_1.UserService, payment_slip_service_1.PaymentSlipService, customer_service_1.CustomerService, isp_service_1.IspService, global_setting_service_1.GlobalSettingService, ...service_providers_1.serviceProviders],
        exports: [user_service_1.UserService, payment_slip_service_1.PaymentSlipService, customer_service_1.CustomerService, isp_service_1.IspService, global_setting_service_1.GlobalSettingService, ...service_providers_1.serviceProviders],
    })
], ServiceCoreModule);
exports.ServiceCoreModule = ServiceCoreModule;
let ServiceModule = class ServiceModule {
};
ServiceModule = __decorate([
    common_1.Module({
        imports: [ServiceCoreModule],
        providers: [ServiceCoreModule],
        exports: [ServiceCoreModule],
    })
], ServiceModule);
exports.ServiceModule = ServiceModule;
//# sourceMappingURL=service.module.js.map