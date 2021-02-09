"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiModule = void 0;
var common_1 = require("@nestjs/common");
var payment_slip_resolver_1 = require("./resolvers/payment-slip.resolver");
var user_resolver_1 = require("./resolvers/user.resolver");
var payment_slip_controller_1 = require("./controllers/payment-slip.controller");
var user_controller_1 = require("./controllers/user.controller");
var service_module_1 = require("../service/service.module");
var ApiModule = /** @class */ (function () {
    function ApiModule() {
    }
    ApiModule = __decorate([
        common_1.Module({
            imports: [service_module_1.ServiceModule],
            controllers: [payment_slip_controller_1.PaymentSlipController, user_controller_1.UserController],
            providers: [service_module_1.ServiceModule, payment_slip_resolver_1.PaymentSlipResolver, user_resolver_1.UserResolver],
            exports: [payment_slip_resolver_1.PaymentSlipResolver, user_resolver_1.UserResolver]
        })
    ], ApiModule);
    return ApiModule;
}());
exports.ApiModule = ApiModule;
