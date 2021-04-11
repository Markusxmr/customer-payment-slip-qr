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
const payment_slip_domain_1 = require("../../domain/payment-slip.domain");
const control_number_1 = require("../../domain/control-number");
let PaymentSlipService = class PaymentSlipService {
    constructor(paymentSlipRepository, ispRepository, customerRepository) {
        this.paymentSlipRepository = paymentSlipRepository;
        this.ispRepository = ispRepository;
        this.customerRepository = customerRepository;
        this.relations = ['customer'];
    }
    async create(createPaymentSlipDto) {
        var _a;
        let item = new payment_slip_entity_1.PaymentSlip();
        let isp = await this.ispRepository.findOne(createPaymentSlipDto === null || createPaymentSlipDto === void 0 ? void 0 : createPaymentSlipDto.isp_id);
        let customer = await this.customerRepository.findOne(createPaymentSlipDto === null || createPaymentSlipDto === void 0 ? void 0 : createPaymentSlipDto.customer_id);
        let paymentSlips = (_a = customer === null || customer === void 0 ? void 0 : customer.paymentSlips) === null || _a === void 0 ? void 0 : _a.sort((a, b) => (b === null || b === void 0 ? void 0 : b.mjesec) - (a === null || a === void 0 ? void 0 : a.mjesec));
        let sortedPaymentSlip = paymentSlips.length > 0 ? paymentSlips[0] : { mjesec: 0 };
        let updateItem = payment_slip_domain_1.paymentSlipDomain({ isp, customer }, (sortedPaymentSlip === null || sortedPaymentSlip === void 0 ? void 0 : sortedPaymentSlip.mjesec) + 1);
        createPaymentSlipDto = Object.assign(Object.assign({}, createPaymentSlipDto), updateItem);
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
    saveMany(updatePaymentSlipDtos) {
        let items = [];
        for (const item of updatePaymentSlipDtos) {
            items.push(item);
        }
        return this.paymentSlipRepository.save(items);
    }
    async findAll() {
        const items = await typeorm_1.getManager().query(`select * from payment_slips order by id desc`);
        return dto_1.dto(items, ['inserted_at', 'updated_at', 'deleted_at']);
    }
    async updateAllPaymentSlips() {
        const items = await typeorm_1.getManager().query(`select * from payment_slips order by id desc`);
        for (const item of items) {
            this.customerRepository.findOne(item === null || item === void 0 ? void 0 : item.customer_id).then(customer => {
                var _a;
                let šifra = (_a = `${customer === null || customer === void 0 ? void 0 : customer.šifra}-`) !== null && _a !== void 0 ? _a : '';
                const poziv_na_broj_primatelja = `${šifra}${control_number_1.controlNumber(customer === null || customer === void 0 ? void 0 : customer.šifra)}`;
                this.update(item.id, { poziv_na_broj_primatelja });
            });
        }
    }
    async findAllBy(options) {
        const items = await this.paymentSlipRepository.find({
            relations: this.relations,
            where: {
                customer_id: options === null || options === void 0 ? void 0 : options.customer_id,
            },
            order: {
                id: 'DESC',
            },
        });
        return dto_1.dto(items, ['inserted_at', 'updated_at', 'deleted_at']);
    }
    findOne(id) {
        return this.paymentSlipRepository.findOne(id);
    }
    async update(id, updatePaymentSlipDto) {
        let item = await this.findOne(id);
        if (!item)
            throw new common_1.NotFoundException();
        let updatedIsp;
        for (const key of Object.keys(updatePaymentSlipDto)) {
            if (key === 'isp_id' && (item === null || item === void 0 ? void 0 : item.isp_id) !== updatePaymentSlipDto[key]) {
                let requestIspId = updatePaymentSlipDto[key];
                let isp = await this.ispRepository.findOne(requestIspId);
                updatedIsp = payment_slip_domain_1.setIspPaymentSlip(isp);
                updatePaymentSlipDto = Object.assign(Object.assign({}, updatePaymentSlipDto), updatedIsp);
            }
        }
        return this.paymentSlipRepository.save(Object.assign(Object.assign({}, item), updatePaymentSlipDto));
    }
    async remove(id) {
        if (!id)
            throw new common_1.NotFoundException('Id not provided');
        let item = await this.findOne(id);
        if (!item)
            throw new common_1.NotFoundException();
        return this.paymentSlipRepository.delete(item.id);
    }
};
PaymentSlipService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PAYMENT_SLIP_REPOSITORY')),
    __param(1, common_1.Inject('ISP_REPOSITORY')),
    __param(2, common_1.Inject('CUSTOMER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], PaymentSlipService);
exports.PaymentSlipService = PaymentSlipService;
//# sourceMappingURL=payment-slip.service.js.map