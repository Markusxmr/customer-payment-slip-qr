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
exports.IspService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const isp_entity_1 = require("../../entities/isp.entity");
const dto_1 = require("../helpers/dto");
let IspService = class IspService {
    constructor(ispRepository) {
        this.ispRepository = ispRepository;
    }
    create(createIspDto) {
        let item = new isp_entity_1.Isp();
        item = Object.assign(Object.assign({}, item), createIspDto);
        return this.ispRepository.save(item);
    }
    createMany(createIspDtos) {
        let items = [];
        for (const item of createIspDtos) {
            items.push(item);
        }
        return this.ispRepository.insert(items);
    }
    async findAll() {
        const items = await typeorm_1.getManager().query(`select * from isps order by id desc`);
        return dto_1.dto(items, ['inserted_at', 'updated_at']);
    }
    async findOne(id) {
        const isp = await this.ispRepository.findOne(id);
        if (!isp) {
            throw new common_1.NotFoundException();
        }
        return isp;
    }
    async findOneDefault() {
        const isps = await this.ispRepository.find({
            where: { defaultIsp: true },
        });
        if (isps.length === 0) {
            throw new common_1.NotFoundException();
        }
        return isps[0];
    }
    async update(id, updateIspDto) {
        let item = await this.findOne(id);
        if (!item)
            throw new common_1.NotFoundException();
        return this.ispRepository.save(Object.assign(Object.assign({}, item), updateIspDto));
    }
    async remove(id) {
        if (!id)
            throw new common_1.NotFoundException('Id not provided');
        let item = await this.findOne(id);
        if (!item)
            throw new common_1.NotFoundException();
        return this.ispRepository.delete(item.id);
    }
};
IspService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ISP_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], IspService);
exports.IspService = IspService;
//# sourceMappingURL=isp.service.js.map