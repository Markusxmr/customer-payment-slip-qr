"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var graphql_1 = require("@nestjs/graphql");
var payment_slip_entity_1 = require("./payment-slip.entity");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        graphql_1.Field(function () { return graphql_1.Int; }),
        typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' })
    ], User.prototype, "id");
    __decorate([
        graphql_1.Field(function () { return graphql_1.Int; }),
        typeorm_1.Column({ name: 'šifra', type: 'integer', nullable: true })
    ], User.prototype, "\u0161ifra");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "naziv");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "adresa");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ name: 'država', type: 'varchar', nullable: true })
    ], User.prototype, "dr\u017Eava");
    __decorate([
        graphql_1.Field(function () { return graphql_1.Int; }),
        typeorm_1.Column({ name: 'pošta', type: 'integer', nullable: true })
    ], User.prototype, "po\u0161ta");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "mjesto");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "porezni_obveznik");
    __decorate([
        graphql_1.Field(function () { return graphql_1.Int; }),
        typeorm_1.Column({ type: 'bigint', nullable: true })
    ], User.prototype, "oib");
    __decorate([
        graphql_1.Field(function () { return graphql_1.Int; }),
        typeorm_1.Column({ name: 'matični_broj', type: 'bigint', nullable: true })
    ], User.prototype, "mati\u010Dni_broj");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ name: 'šifra_djelatnosti', type: 'varchar', nullable: true })
    ], User.prototype, "\u0161ifra_djelatnosti");
    __decorate([
        graphql_1.Field(function () { return graphql_1.Int; }),
        typeorm_1.Column({ type: 'bigint', nullable: true })
    ], User.prototype, "identifikacijski_broj");
    __decorate([
        typeorm_1.Column({ name: 'novčana_jedinica', type: 'varchar', nullable: true })
    ], User.prototype, "nov\u010Dana_jedinica");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ name: 'dani_za_dospijeće', type: 'varchar', nullable: true })
    ], User.prototype, "dani_za_dospije\u0107e");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "postotak_rabata");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "internet_stranica");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ name: 'transakcijski_račun', type: 'varchar', nullable: true })
    ], User.prototype, "transakcijski_ra\u010Dun");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "ime_prezime_kontakta");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "telefon");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ name: 'elektronska_pošta', type: 'varchar', nullable: true })
    ], User.prototype, "elektronska_po\u0161ta");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "naziv_za_slanje");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "adresa_za_slanje");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ name: 'država_za_slanje', type: 'varchar', nullable: true })
    ], User.prototype, "dr\u017Eava_za_slanje");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ name: 'pošta_za_slanje', type: 'varchar', nullable: true })
    ], User.prototype, "po\u0161ta_za_slanje");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ name: 'mjesto_pošte_za_slanje', type: 'varchar', nullable: true })
    ], User.prototype, "mjesto_po\u0161te_za_slanje");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "naziv_primatelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "adresa_primatelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ name: 'država_primatelja', type: 'varchar', nullable: true })
    ], User.prototype, "dr\u017Eava_primatelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ name: 'pošta_primatelja', type: 'varchar', nullable: true })
    ], User.prototype, "po\u0161ta_primatelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], User.prototype, "mjesto_primatelja");
    __decorate([
        graphql_1.Field(function () { return [payment_slip_entity_1.PaymentSlip]; }),
        typeorm_1.OneToMany(function () { return payment_slip_entity_1.PaymentSlip; }, function (entity) { return entity.user; }, {
            eager: true
        })
    ], User.prototype, "paymentSlips");
    __decorate([
        graphql_1.Field(function () { return Date; }),
        typeorm_1.CreateDateColumn()
    ], User.prototype, "inserted_at");
    __decorate([
        graphql_1.Field(function () { return Date; }),
        typeorm_1.UpdateDateColumn()
    ], User.prototype, "updated_at");
    User = __decorate([
        graphql_1.ObjectType(),
        typeorm_1.Entity('users')
    ], User);
    return User;
}());
exports.User = User;
