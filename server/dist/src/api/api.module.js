"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const isp_controller_1 = require("./controllers/isp.controller");
const payment_slip_controller_1 = require("./controllers/payment-slip.controller");
const customer_controller_1 = require("./controllers/customer.controller");
const customer_resolver_1 = require("./resolvers/customer.resolver");
const payment_slip_resolver_1 = require("./resolvers/payment-slip.resolver");
const service_module_1 = require("../service/service.module");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [service_module_1.ServiceModule],
        controllers: [payment_slip_controller_1.PaymentSlipController, customer_controller_1.CustomerController, isp_controller_1.IspController],
        providers: [service_module_1.ServiceModule, payment_slip_resolver_1.PaymentSlipResolver, customer_resolver_1.CustomerResolver],
        exports: [payment_slip_resolver_1.PaymentSlipResolver, customer_resolver_1.CustomerResolver],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map