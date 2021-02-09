"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ServiceModule = exports.ServiceCoreModule = void 0;
var common_1 = require("@nestjs/common");
var user_service_1 = require("./services/user.service");
var payment_slip_service_1 = require("./services/payment-slip.service");
var service_providers_1 = require("./service.providers");
var database_module_1 = require("../database/database.module");
var ServiceCoreModule = /** @class */ (function () {
    function ServiceCoreModule() {
    }
    ServiceCoreModule = __decorate([
        common_1.Module({
            imports: [database_module_1.DatabaseModule],
            providers: __spreadArrays([payment_slip_service_1.PaymentSlipService, user_service_1.UserService], service_providers_1.serviceProviders),
            exports: __spreadArrays([payment_slip_service_1.PaymentSlipService, user_service_1.UserService], service_providers_1.serviceProviders)
        })
    ], ServiceCoreModule);
    return ServiceCoreModule;
}());
exports.ServiceCoreModule = ServiceCoreModule;
var ServiceModule = /** @class */ (function () {
    function ServiceModule() {
    }
    ServiceModule = __decorate([
        common_1.Module({
            imports: [ServiceCoreModule],
            providers: [ServiceCoreModule],
            exports: [ServiceCoreModule]
        })
    ], ServiceModule);
    return ServiceModule;
}());
exports.ServiceModule = ServiceModule;
