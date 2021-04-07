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
exports.IspController = void 0;
const common_1 = require("@nestjs/common");
const isp_service_1 = require("../../service/services/isp.service");
const create_isp_dto_1 = require("../dto/isp/create-isp.dto");
const update_isp_dto_1 = require("../dto/isp/update-isp.dto");
let IspController = class IspController {
    constructor(ispService) {
        this.ispService = ispService;
    }
    create(createIspDto) {
        return this.ispService.create(createIspDto);
    }
    findAll() {
        return this.ispService.findAll();
    }
    findOne(id) {
        return this.ispService.findOne(+id);
    }
    update(id, updateIspDto) {
        return this.ispService.update(+id, updateIspDto);
    }
    remove(id) {
        return this.ispService.remove(+id);
    }
    login(login) {
        const currentUsername = 'genex';
        const currentPassword = 'ogulin1808';
        const username = login === null || login === void 0 ? void 0 : login.username;
        const password = login === null || login === void 0 ? void 0 : login.password;
        return currentUsername === username && currentPassword === password;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_isp_dto_1.CreateIspDto]),
    __metadata("design:returntype", void 0)
], IspController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IspController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IspController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_isp_dto_1.UpdateIspDto]),
    __metadata("design:returntype", void 0)
], IspController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IspController.prototype, "remove", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IspController.prototype, "login", null);
IspController = __decorate([
    common_1.Controller('isp'),
    __metadata("design:paramtypes", [isp_service_1.IspService])
], IspController);
exports.IspController = IspController;
//# sourceMappingURL=isp.controller.js.map