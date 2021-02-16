"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dto = void 0;
function dto(items, excludes) {
    return items.map((item) => {
        for (const exclude of excludes) {
            delete item[exclude];
        }
        return item;
    });
}
exports.dto = dto;
//# sourceMappingURL=dto.js.map