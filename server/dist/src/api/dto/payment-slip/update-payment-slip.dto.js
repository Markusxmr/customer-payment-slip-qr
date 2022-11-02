"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentSlipDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_payment_slip_dto_1 = require("./create-payment-slip.dto");
class UpdatePaymentSlipDto extends (0, mapped_types_1.PartialType)(create_payment_slip_dto_1.CreatePaymentSlipDto) {
}
exports.UpdatePaymentSlipDto = UpdatePaymentSlipDto;
//# sourceMappingURL=update-payment-slip.dto.js.map