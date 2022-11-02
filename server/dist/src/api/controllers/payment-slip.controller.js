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
exports.PaymentSlipController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path_1 = require("path");
const payment_slip_service_1 = require("../../service/services/payment-slip.service");
const create_payment_slip_dto_1 = require("../dto/payment-slip/create-payment-slip.dto");
const update_payment_slip_dto_1 = require("../dto/payment-slip/update-payment-slip.dto");
const load_files_1 = require("../../common/load-files");
let PaymentSlipController = class PaymentSlipController {
    constructor(paymentSlipService) {
        this.paymentSlipService = paymentSlipService;
    }
    findFiles() {
        const dir = (0, path_1.join)(process.cwd(), 'files');
        let files = (0, load_files_1.getFilesFromDir)(dir, '.pdf');
        return files;
        let data = {};
        function readFiles(dirname, onFileContent, onError) {
            fs.readdir(dirname, function (err, filenames) {
                if (err) {
                    onError(err);
                    return;
                }
                filenames.forEach(function (filename) {
                    fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                        if (err) {
                            onError(err);
                            return;
                        }
                        onFileContent(filename, content);
                    });
                });
            });
            return data;
        }
        return readFiles(dir, function (filename, content) {
            data[filename] = content;
        }, function (err) {
            throw err;
        });
    }
    create(createPaymentSlipDto) {
        return this.paymentSlipService.create(createPaymentSlipDto);
    }
    findAll() {
        return this.paymentSlipService.findAll();
    }
    findOne(id) {
        return this.paymentSlipService.findOne(+id);
    }
    update(id, updatePaymentSlipDto) {
        return this.paymentSlipService.update(+id, updatePaymentSlipDto);
    }
    remove(id) {
        return this.paymentSlipService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)('/files'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentSlipController.prototype, "findFiles", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_slip_dto_1.CreatePaymentSlipDto]),
    __metadata("design:returntype", void 0)
], PaymentSlipController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentSlipController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentSlipController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_slip_dto_1.UpdatePaymentSlipDto]),
    __metadata("design:returntype", void 0)
], PaymentSlipController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentSlipController.prototype, "remove", null);
PaymentSlipController = __decorate([
    (0, common_1.Controller)('payment-slip'),
    __metadata("design:paramtypes", [payment_slip_service_1.PaymentSlipService])
], PaymentSlipController);
exports.PaymentSlipController = PaymentSlipController;
//# sourceMappingURL=payment-slip.controller.js.map