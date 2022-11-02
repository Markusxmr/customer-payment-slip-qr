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
const core_1 = require("@nestjs/core");
const isp_controller_1 = require("./controllers/isp.controller");
const payment_slip_controller_1 = require("./controllers/payment-slip.controller");
const customer_controller_1 = require("./controllers/customer.controller");
const global_setting_controller_1 = require("./controllers/global-setting.controller");
const customer_resolver_1 = require("./resolvers/customer.resolver");
const payment_slip_resolver_1 = require("./resolvers/payment-slip.resolver");
const service_module_1 = require("../service/service.module");
const user_controller_1 = require("./controllers/user.controller");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("../service/services/auth.service");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [service_module_1.ServiceModule, auth_module_1.AuthModule],
        controllers: [
            auth_controller_1.AuthController,
            user_controller_1.UserController,
            payment_slip_controller_1.PaymentSlipController,
            customer_controller_1.CustomerController,
            isp_controller_1.IspController,
            global_setting_controller_1.GlobalSettingController,
        ],
        providers: [
            auth_service_1.AuthService,
            payment_slip_resolver_1.PaymentSlipResolver,
            customer_resolver_1.CustomerResolver,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
        exports: [],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map