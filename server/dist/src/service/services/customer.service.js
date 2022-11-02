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
            .where('naziv like :naziv', { naziv: `%${options === null || options === void 0 ? void 0 : options.naziv}%` })
            .orWhere('adresa like :adresa', { adresa: `%${options === null || options === void 0 ? void 0 : options.adresa}%` })
            .orWhere('mjesto like :mjesto', { mjesto: `%${options === null || options === void 0 ? void 0 : options.mjesto}%` })
            .orderBy('customers.id', 'DESC')
            .getMany();
        return (0, dto_1.dto)(items, this.excludes);
    }
    async findOne(id) {
        const customer = await this.customerRepository.findOne(id);
        if (!customer)
            throw new common_1.NotFoundException();
        let paymentSlips = await (0, typeorm_1.getManager)().query(`
      select * from payment_slips
      where customer_id = ?
      order by id asc`, [id]);
        paymentSlips = (0, dto_1.dto)(paymentSlips, this.excludes);
        return Object.assign(Object.assign({}, customer), { paymentSlips });
    }
    async update(id, updateCustomerDto) {
        let customer = await this.findOne(id);
        if (!customer)
            throw new common_1.NotFoundException();
        customer = await this.customerRepository.save(Object.assign(Object.assign({}, customer), updateCustomerDto));
        let paymentSlips = await this.paymentSlipRepository
            .createQueryBuilder('payment_slips')
            .innerJoinAndSelect('payment_slips.isp', 'isp')
            .where('payment_slips.customer_id = :customerId', { customerId: id })
            .getMany();
        for (const paymentSlip of paymentSlips) {
            let updatedPaymentSlip = (0, payment_slip_domain_1.paymentSlipDomain)({ isp: paymentSlip.isp, customer }, paymentSlip === null || paymentSlip === void 0 ? void 0 : paymentSlip.mjesec);
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
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PAYMENT_SLIP_REPOSITORY')),
    __param(1, (0, common_1.Inject)('ISP_REPOSITORY')),
    __param(2, (0, common_1.Inject)('CUSTOMER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map