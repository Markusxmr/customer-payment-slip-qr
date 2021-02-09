"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var fs = require("fs");
var path_1 = require("path");
var xls_json = require("xls-to-json");
var platform_express_1 = require("@nestjs/platform-express");
var set_payment_slip_1 = require("../../common/set-payment-slip");
var UserController = /** @class */ (function () {
    function UserController(userService, paymentSlipService) {
        this.userService = userService;
        this.paymentSlipService = paymentSlipService;
    }
    UserController.prototype.create = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, items, _i, items_1, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.create(createUserDto)];
                    case 1:
                        user = _a.sent();
                        items = new Array(12);
                        _i = 0, items_1 = items;
                        _a.label = 2;
                    case 2:
                        if (!(_i < items_1.length)) return [3 /*break*/, 5];
                        item = items_1[_i];
                        return [4 /*yield*/, this.paymentSlipService.create(set_payment_slip_1.setPaymentSlip(user))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.findAll = function (options) {
        return this.userService.findAll(options);
    };
    UserController.prototype.findOne = function (id) {
        return this.userService.findOne(+id);
    };
    UserController.prototype.update = function (id, updateUserDto) {
        return this.userService.update(+id, updateUserDto);
    };
    UserController.prototype.removeAll = function () {
        return this.userService.removeAll();
    };
    UserController.prototype.remove = function (id) {
        return this.userService.remove(+id);
    };
    UserController.prototype.uploadFile = function (res, file) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, jsonPath, source, users, userInstances, _i, userInstances_1, userInstance, items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = path_1.join(process.cwd(), 'files', file.originalname);
                        jsonPath = filePath.replace('xlsx', 'json').replace('xls', 'json');
                        fs.writeFileSync(filePath, file.buffer, {});
                        xls_json({
                            input: filePath,
                            output: jsonPath,
                            sheet: 'Sheet',
                            // rowsToSkip: 5, // number of rows to skip at the top of the sheet; defaults to 0
                            allowEmptyKey: false
                        }, function (err, results) {
                            if (err)
                                console.error(err);
                            else
                                return results.map(function (item) {
                                    return Object.keys(item).reduce(function (acc, key) {
                                        var _a;
                                        return __assign(__assign({}, acc), (_a = {}, _a[key.toLowerCase().replace(' ', '_')] = item[key], _a));
                                    }, {});
                                });
                        });
                        source = fs.readFileSync(jsonPath);
                        users = JSON.parse(source);
                        if (!Array.isArray(users)) return [3 /*break*/, 8];
                        users = users.map(function (item) {
                            return Object.keys(item).reduce(function (acc, key) {
                                var _a;
                                return item[key]
                                    ? __assign(__assign({}, acc), (_a = {}, _a[key.toLowerCase().replace(' ', '_')] = item[key], _a)) : acc;
                            }, {});
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.userService.createMany(users)];
                    case 2:
                        userInstances = _a.sent();
                        _i = 0, userInstances_1 = userInstances;
                        _a.label = 3;
                    case 3:
                        if (!(_i < userInstances_1.length)) return [3 /*break*/, 6];
                        userInstance = userInstances_1[_i];
                        items = new Array(12).fill(set_payment_slip_1.setPaymentSlip(userInstance));
                        return [4 /*yield*/, this.paymentSlipService.createMany(items)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 8];
                    case 8:
                        res.send({
                            ok: 'ok'
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], UserController.prototype, "create");
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query())
    ], UserController.prototype, "findAll");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], UserController.prototype, "findOne");
    __decorate([
        common_1.Put(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], UserController.prototype, "update");
    __decorate([
        common_1.Delete()
    ], UserController.prototype, "removeAll");
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], UserController.prototype, "remove");
    __decorate([
        common_1.Post('xls'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
        __param(0, common_1.Response()), __param(1, common_1.UploadedFile())
    ], UserController.prototype, "uploadFile");
    UserController = __decorate([
        common_1.Controller('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
