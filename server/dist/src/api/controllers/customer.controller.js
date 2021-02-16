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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path_1 = require("path");
const xls_json = require("xls-to-json");
const customer_service_1 = require("../../service/services/customer.service");
const create_customer_dto_1 = require("../dto/customer/create-customer.dto");
const update_customer_dto_1 = require("../dto/customer/update-customer.dto");
const platform_express_1 = require("@nestjs/platform-express");
const payment_slip_service_1 = require("../../service/services/payment-slip.service");
const set_payment_slip_1 = require("../../common/set-payment-slip");
let CustomerController = class CustomerController {
    constructor(customerService, paymentSlipService) {
        this.customerService = customerService;
        this.paymentSlipService = paymentSlipService;
    }
    async create(createCustomerDto) {
        const isp = { isp_id: 1 };
        const customer = await this.customerService.create(createCustomerDto);
        const items = new Array(12);
        for (const item of items) {
            await this.paymentSlipService.create(set_payment_slip_1.setPaymentSlip({ isp, customer }));
        }
        return this.customerService.findOne(customer === null || customer === void 0 ? void 0 : customer.id);
    }
    findAll(options) {
        return this.customerService.findAll(options);
    }
    findOne(id) {
        return this.customerService.findOne(+id);
    }
    update(id, updateCustomerDto) {
        return this.customerService.update(+id, updateCustomerDto);
    }
    removeAll() {
        return this.customerService.removeAll();
    }
    remove(id) {
        return this.customerService.remove(+id);
    }
    async uploadFile(res, file) {
        const isp = { isp_id: 1 };
        const filePath = path_1.join(process.cwd(), 'files', file.originalname);
        const jsonPath = filePath.replace('xlsx', 'json').replace('xls', 'json');
        fs.writeFileSync(filePath, file.buffer, {});
        xls_json({
            input: filePath,
            output: jsonPath,
            sheet: 'Sheet',
            allowEmptyKey: false,
        }, function (err, results) {
            if (err)
                console.error(err);
            else
                return results.map((item) => {
                    return Object.keys(item).reduce((acc, key) => {
                        return Object.assign(Object.assign({}, acc), { [key.toLowerCase().replace(' ', '_')]: item[key] });
                    }, {});
                });
        });
        let source = fs.readFileSync(jsonPath);
        let customers = JSON.parse(source);
        if (Array.isArray(customers)) {
            customers = customers.map((item) => {
                return Object.keys(item).reduce((acc, key) => {
                    return item[key]
                        ? Object.assign(Object.assign({}, acc), { [key.toLowerCase().replace(' ', '_')]: item[key] }) : acc;
                }, {});
            });
            try {
                const customerInstances = await this.customerService.createMany(customers);
                for (const customer of customerInstances) {
                    const items = new Array(12).fill(set_payment_slip_1.setPaymentSlip({ isp, customer }));
                    await this.paymentSlipService.createMany(items);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        res.send({
            ok: 'ok',
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "update", null);
__decorate([
    common_1.Delete(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "removeAll", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "remove", null);
__decorate([
    common_1.Post('xls'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Response()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "uploadFile", null);
CustomerController = __decorate([
    common_1.Controller('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService,
        payment_slip_service_1.PaymentSlipService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map