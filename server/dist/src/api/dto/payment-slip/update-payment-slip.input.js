"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentSlipInput = void 0;
const create_payment_slip_input_1 = require("./create-payment-slip.input");
const graphql_1 = require("@nestjs/graphql");
let UpdatePaymentSlipInput = class UpdatePaymentSlipInput extends (0, graphql_1.PartialType)(create_payment_slip_input_1.CreatePaymentSlipInput) {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdatePaymentSlipInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdatePaymentSlipInput.prototype, "poziv_na_broj_primatelja", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdatePaymentSlipInput.prototype, "iznos", void 0);
UpdatePaymentSlipInput = __decorate([
    (0, graphql_1.InputType)()
], UpdatePaymentSlipInput);
exports.UpdatePaymentSlipInput = UpdatePaymentSlipInput;
//# sourceMappingURL=update-payment-slip.input.js.map