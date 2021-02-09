"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaymentSlip = void 0;
var typeorm_1 = require("typeorm");
var graphql_1 = require("@nestjs/graphql");
var user_entity_1 = require("./user.entity");
var PaymentSlip = /** @class */ (function () {
    function PaymentSlip() {
    }
    __decorate([
        graphql_1.Field(function () { return graphql_1.Int; }),
        typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' })
    ], PaymentSlip.prototype, "id");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "poziv_na_broj_platitelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "poziv_na_broj_primatelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', "default": '000', nullable: true })
    ], PaymentSlip.prototype, "iznos");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "iban_primatelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "iban_platitelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "model_primatelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "model_platitelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "sifra_namjene");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "datum_izvrsenja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "valuta_placanja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "hitno");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "ime_i_prezime_platitelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "ulica_i_broj_platitelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "ulica_i_broj_primatelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "postanski_i_grad_platitelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "postanski_i_grad_primatelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "naziv_primatelja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "opis_placanja");
    __decorate([
        graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], PaymentSlip.prototype, "nalog");
    __decorate([
        graphql_1.Field(function () { return graphql_1.Int; }),
        typeorm_1.Column({ type: 'integer', nullable: true }),
        typeorm_1.RelationId(function (entity) { return entity.user; })
    ], PaymentSlip.prototype, "user_id");
    __decorate([
        graphql_1.Field(function () { return user_entity_1.User; }),
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (entity) { return entity.paymentSlips; }, {
            onDelete: 'CASCADE'
        }),
        typeorm_1.JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    ], PaymentSlip.prototype, "user");
    __decorate([
        graphql_1.Field(function () { return Date; }),
        typeorm_1.CreateDateColumn()
    ], PaymentSlip.prototype, "inserted_at");
    __decorate([
        graphql_1.Field(function () { return Date; }),
        typeorm_1.UpdateDateColumn()
    ], PaymentSlip.prototype, "updated_at");
    PaymentSlip = __decorate([
        graphql_1.ObjectType(),
        typeorm_1.Entity('payment_slips')
    ], PaymentSlip);
    return PaymentSlip;
}());
exports.PaymentSlip = PaymentSlip;
