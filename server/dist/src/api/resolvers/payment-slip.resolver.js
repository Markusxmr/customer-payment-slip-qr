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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSlipResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const payment_slip_service_1 = require("../../service/services/payment-slip.service");
const payment_slip_entity_1 = require("../../entities/payment-slip.entity");
const create_payment_slip_input_1 = require("../dto/payment-slip/create-payment-slip.input");
const update_payment_slip_input_1 = require("../dto/payment-slip/update-payment-slip.input");
let PaymentSlipResolver = class PaymentSlipResolver {
    constructor(paymentSlipService) {
        this.paymentSlipService = paymentSlipService;
    }
    createPaymentSlip(createPaymentSlipInput) {
        return this.paymentSlipService.create(createPaymentSlipInput);
    }
    findAll() {
        return this.paymentSlipService.findAll();
    }
    findOne(id) {
        return this.paymentSlipService.findOne(id);
    }
    updatePaymentSlip(updatePaymentSlipInput) {
        return this.paymentSlipService.update(updatePaymentSlipInput.id, updatePaymentSlipInput);
    }
    removePaymentSlip(id) {
        return this.paymentSlipService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => payment_slip_entity_1.PaymentSlip),
    __param(0, (0, graphql_1.Args)('createPaymentSlipInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_slip_input_1.CreatePaymentSlipInput]),
    __metadata("design:returntype", void 0)
], PaymentSlipResolver.prototype, "createPaymentSlip", null);
__decorate([
    (0, graphql_1.Query)(() => [payment_slip_entity_1.PaymentSlip], { name: 'user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentSlipResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => payment_slip_entity_1.PaymentSlip, { name: 'user' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentSlipResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => payment_slip_entity_1.PaymentSlip),
    __param(0, (0, graphql_1.Args)('updatePaymentSlipInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_payment_slip_input_1.UpdatePaymentSlipInput]),
    __metadata("design:returntype", void 0)
], PaymentSlipResolver.prototype, "updatePaymentSlip", null);
__decorate([
    (0, graphql_1.Mutation)(() => payment_slip_entity_1.PaymentSlip),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentSlipResolver.prototype, "removePaymentSlip", null);
PaymentSlipResolver = __decorate([
    (0, graphql_1.Resolver)(() => payment_slip_entity_1.PaymentSlip),
    __metadata("design:paramtypes", [payment_slip_service_1.PaymentSlipService])
], PaymentSlipResolver);
exports.PaymentSlipResolver = PaymentSlipResolver;
//# sourceMappingURL=payment-slip.resolver.js.map