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
exports.PaymentSlipService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const payment_slip_entity_1 = require("../../entities/payment-slip.entity");
const dto_1 = require("../helpers/dto");
let PaymentSlipService = class PaymentSlipService {
    constructor(paymentSlipRepository) {
        this.paymentSlipRepository = paymentSlipRepository;
    }
    create(createPaymentSlipDto) {
        let item = new payment_slip_entity_1.PaymentSlip();
        item = Object.assign(Object.assign({}, item), createPaymentSlipDto);
        return this.paymentSlipRepository.save(item);
    }
    createMany(createPaymentSlipDtos) {
        let items = [];
        for (const item of createPaymentSlipDtos) {
            items.push(item);
        }
        return this.paymentSlipRepository.insert(items);
    }
    async findAll() {
        const items = await typeorm_1.getManager().query(`select * from payment_slips order by id desc`);
        return dto_1.dto(items, ['inserted_at', 'updated_at']);
    }
    findOne(id) {
        return this.paymentSlipRepository.findOne(id);
    }
    async update(id, updatePaymentSlipDto) {
        let item = await this.findOne(id);
        if (!item)
            throw new common_1.NotFoundException();
        return this.paymentSlipRepository.save(Object.assign(Object.assign({}, item), updatePaymentSlipDto));
    }
    async remove(id) {
        let item = await this.findOne(id);
        if (!item)
            throw new common_1.NotFoundException();
        return this.paymentSlipRepository.delete(item.id);
    }
};
PaymentSlipService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PAYMENT_SLIP_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PaymentSlipService);
exports.PaymentSlipService = PaymentSlipService;
//# sourceMappingURL=payment-slip.service.js.map