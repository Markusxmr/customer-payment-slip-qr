"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.PaymentSlipResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var payment_slip_entity_1 = require("../../entities/payment-slip.entity");
var PaymentSlipResolver = /** @class */ (function () {
    function PaymentSlipResolver(paymentSlipService) {
        this.paymentSlipService = paymentSlipService;
    }
    PaymentSlipResolver.prototype.createPaymentSlip = function (createPaymentSlipInput) {
        return this.paymentSlipService.create(createPaymentSlipInput);
    };
    PaymentSlipResolver.prototype.findAll = function () {
        return this.paymentSlipService.findAll();
    };
    PaymentSlipResolver.prototype.findOne = function (id) {
        return this.paymentSlipService.findOne(id);
    };
    PaymentSlipResolver.prototype.updatePaymentSlip = function (updatePaymentSlipInput) {
        return this.paymentSlipService.update(updatePaymentSlipInput.id, updatePaymentSlipInput);
    };
    PaymentSlipResolver.prototype.removePaymentSlip = function (id) {
        return this.paymentSlipService.remove(id);
    };
    __decorate([
        graphql_1.Mutation(function () { return payment_slip_entity_1.PaymentSlip; }),
        __param(0, graphql_1.Args('createPaymentSlipInput'))
    ], PaymentSlipResolver.prototype, "createPaymentSlip");
    __decorate([
        graphql_1.Query(function () { return [payment_slip_entity_1.PaymentSlip]; }, { name: 'user' })
    ], PaymentSlipResolver.prototype, "findAll");
    __decorate([
        graphql_1.Query(function () { return payment_slip_entity_1.PaymentSlip; }, { name: 'user' }),
        __param(0, graphql_1.Args('id', { type: function () { return graphql_1.Int; } }))
    ], PaymentSlipResolver.prototype, "findOne");
    __decorate([
        graphql_1.Mutation(function () { return payment_slip_entity_1.PaymentSlip; }),
        __param(0, graphql_1.Args('updatePaymentSlipInput'))
    ], PaymentSlipResolver.prototype, "updatePaymentSlip");
    __decorate([
        graphql_1.Mutation(function () { return payment_slip_entity_1.PaymentSlip; }),
        __param(0, graphql_1.Args('id', { type: function () { return graphql_1.Int; } }))
    ], PaymentSlipResolver.prototype, "removePaymentSlip");
    PaymentSlipResolver = __decorate([
        graphql_1.Resolver(function () { return payment_slip_entity_1.PaymentSlip; })
    ], PaymentSlipResolver);
    return PaymentSlipResolver;
}());
exports.PaymentSlipResolver = PaymentSlipResolver;
