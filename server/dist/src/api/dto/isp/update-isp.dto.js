"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIspDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_isp_dto_1 = require("./create-isp.dto");
class UpdateIspDto extends (0, mapped_types_1.PartialType)(create_isp_dto_1.CreateIspDto) {
}
exports.UpdateIspDto = UpdateIspDto;
//# sourceMappingURL=update-isp.dto.js.map