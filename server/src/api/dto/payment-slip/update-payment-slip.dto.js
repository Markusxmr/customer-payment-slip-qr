"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UpdatePaymentSlipDto = void 0;
var mapped_types_1 = require("@nestjs/mapped-types");
var create_payment_slip_dto_1 = require("./create-payment-slip.dto");
var UpdatePaymentSlipDto = /** @class */ (function (_super) {
    __extends(UpdatePaymentSlipDto, _super);
    function UpdatePaymentSlipDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdatePaymentSlipDto;
}(mapped_types_1.PartialType(create_payment_slip_dto_1.CreatePaymentSlipDto)));
exports.UpdatePaymentSlipDto = UpdatePaymentSlipDto;
