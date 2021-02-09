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
exports.PaymentSlipController = void 0;
var common_1 = require("@nestjs/common");
var fs = require("fs");
var path_1 = require("path");
var load_files_1 = require("../../common/load-files");
var PaymentSlipController = /** @class */ (function () {
    function PaymentSlipController(paymentSlipService) {
        this.paymentSlipService = paymentSlipService;
    }
    PaymentSlipController.prototype.findFiles = function () {
        var dir = path_1.join(process.cwd(), 'files');
        var files = load_files_1.getFilesFromDir(dir, '.pdf');
        console.log(files);
        return files;
        var data = {};
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
    };
    PaymentSlipController.prototype.create = function (createPaymentSlipDto) {
        return this.paymentSlipService.create(createPaymentSlipDto);
    };
    PaymentSlipController.prototype.findAll = function () {
        return this.paymentSlipService.findAll();
    };
    PaymentSlipController.prototype.findOne = function (id) {
        return this.paymentSlipService.findOne(+id);
    };
    PaymentSlipController.prototype.update = function (id, updatePaymentSlipDto) {
        return this.paymentSlipService.update(+id, updatePaymentSlipDto);
    };
    PaymentSlipController.prototype.remove = function (id) {
        return this.paymentSlipService.remove(+id);
    };
    __decorate([
        common_1.Get('/files')
    ], PaymentSlipController.prototype, "findFiles");
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], PaymentSlipController.prototype, "create");
    __decorate([
        common_1.Get()
    ], PaymentSlipController.prototype, "findAll");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], PaymentSlipController.prototype, "findOne");
    __decorate([
        common_1.Put(':id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body())
    ], PaymentSlipController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], PaymentSlipController.prototype, "remove");
    PaymentSlipController = __decorate([
        common_1.Controller('payment-slip')
    ], PaymentSlipController);
    return PaymentSlipController;
}());
exports.PaymentSlipController = PaymentSlipController;
