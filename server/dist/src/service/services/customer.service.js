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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../../entities/customer.entity");
const dto_1 = require("../helpers/dto");
const payment_slip_domain_1 = require("../../domain/payment-slip.domain");
let CustomerService = class CustomerService {
    constructor(paymentSlipRepository, ispRepository, customerRepository) {
        this.paymentSlipRepository = paymentSlipRepository;
        this.ispRepository = ispRepository;
        this.customerRepository = customerRepository;
        this.relations = ['paymentSlips', 'isp'];
        this.excludes = ['inserted_at', 'updated_at', 'deleted_at'];
    }
    create(createCustomerDto) {
        let item = new customer_entity_1.Customer();
        return this.customerRepository.save(Object.assign(Object.assign({}, item), createCustomerDto));
    }
    createMany(createCustomerDtos) {
        let items = [];
        for (const item of createCustomerDtos) {
            items.push(item);
        }
        return this.customerRepository.save(items);
    }
    async findAll(options) {
        const items = await this.customerRepository
            .createQueryBuilder('customers')
            .where('naziv ilike :naziv', { naziv: `%${options === null || options === void 0 ? void 0 : options.naziv}%` })
            .orWhere('adresa ilike :adresa', { adresa: `%${options === null || options === void 0 ? void 0 : options.adresa}%` })
            .orWhere('mjesto ilike :mjesto', { mjesto: `%${options === null || options === void 0 ? void 0 : options.mjesto}%` })
            .orderBy('customers.id', 'DESC')
            .getMany();
        return dto_1.dto(items, this.excludes);
    }
    async findOne(id) {
        const customers = await typeorm_1.getManager().query(`select * from customers where id = $1`, [id]);
        let paymentSlips = await typeorm_1.getManager().query(`select * from payment_slips where customer_id = $1 order by id desc`, [
            id,
        ]);
        paymentSlips = dto_1.dto(paymentSlips, this.excludes);
        if (customers.length === 0) {
            throw new common_1.NotFoundException();
        }
        return Object.assign(Object.assign({}, customers[0]), { paymentSlips });
        return this.customerRepository
            .createQueryBuilder('customers')
            .leftJoinAndSelect('customers.paymentSlips', 'paymentSlips')
            .orderBy('paymentSlips.id', 'DESC')
            .where('customers.id = :id', { id })
            .getOne();
    }
    async update(id, updateCustomerDto) {
        let item = await this.findOne(id);
        if (!item)
            throw new common_1.NotFoundException();
        updateCustomerDto === null || updateCustomerDto === void 0 ? true : delete updateCustomerDto.paymentSlips;
        let customer = await this.customerRepository.save(Object.assign(Object.assign({}, item), updateCustomerDto));
        let paymentSlips = await typeorm_1.getManager().query(`select * from payment_slips where customer_id = $1`, [item === null || item === void 0 ? void 0 : item.id]);
        let isp;
        for (const paymentSlip of paymentSlips) {
            if (!isp || (isp === null || isp === void 0 ? void 0 : isp.id) !== (paymentSlip === null || paymentSlip === void 0 ? void 0 : paymentSlip.isp_id)) {
                isp = await this.ispRepository.findOne(paymentSlip === null || paymentSlip === void 0 ? void 0 : paymentSlip.isp_id);
            }
            let updatedPaymentSlip = payment_slip_domain_1.paymentSlipDomain({ isp, customer }, paymentSlip === null || paymentSlip === void 0 ? void 0 : paymentSlip.mjesec);
            await this.paymentSlipRepository.update(paymentSlip === null || paymentSlip === void 0 ? void 0 : paymentSlip.id, updatedPaymentSlip);
        }
        return customer;
    }
    async removeAll() {
        await this.customerRepository.createQueryBuilder('customers').delete().from(customer_entity_1.Customer).execute();
        return new typeorm_1.DeleteResult();
    }
    async remove(id) {
        if (!id)
            throw new common_1.NotFoundException('Id not provided');
        let item = await this.customerRepository.findOne(id);
        if (!item)
            throw new common_1.NotFoundException();
        return this.customerRepository.delete(item.id);
    }
};
CustomerService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PAYMENT_SLIP_REPOSITORY')),
    __param(1, common_1.Inject('ISP_REPOSITORY')),
    __param(2, common_1.Inject('CUSTOMER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map