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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const payment_slip_entity_1 = require("./payment-slip.entity");
let Customer = class Customer {
    id;
    šifra;
    naziv;
    obveza;
    iznos_opreme;
    adresa;
    država;
    pošta;
    mjesto;
    porezni_obveznik;
    oib;
    matični_broj;
    šifra_djelatnosti;
    identifikacijski_broj;
    novčana_jedinica;
    dani_za_dospijeće;
    postotak_rabata;
    internet_stranica;
    transakcijski_račun;
    ime_prezime_kontakta;
    telefon;
    elektronska_pošta;
    naziv_za_slanje;
    adresa_za_slanje;
    država_za_slanje;
    pošta_za_slanje;
    mjesto_pošte_za_slanje;
    naziv_primatelja;
    adresa_primatelja;
    država_primatelja;
    pošta_primatelja;
    mjesto_primatelja;
    paymentSlips;
    inserted_at;
    updated_at;
};
exports.Customer = Customer;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer' }),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ name: 'šifra', type: 'integer', unique: true, nullable: true }),
    __metadata("design:type", Number)
], Customer.prototype, "\u0161ifra", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "naziv", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)({
        type: 'numeric',
        precision: 10,
        scale: 4,
        nullable: true,
        transformer: {
            to: (value) => value,
            from: (value) => (value !== null ? Number(parseFloat(value).toFixed(2)) : null),
        },
    }),
    __metadata("design:type", Object)
], Customer.prototype, "obveza", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)({
        type: 'numeric',
        precision: 10,
        scale: 4,
        nullable: true,
        transformer: {
            to: (value) => value,
            from: (value) => (value !== null ? Number(parseFloat(value).toFixed(2)) : null),
        },
    }),
    __metadata("design:type", Object)
], Customer.prototype, "iznos_opreme", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "adresa", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ name: 'država', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "dr\u017Eava", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ name: 'pošta', type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], Customer.prototype, "po\u0161ta", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "mjesto", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "porezni_obveznik", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Customer.prototype, "oib", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ name: 'matični_broj', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Customer.prototype, "mati\u010Dni_broj", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ name: 'šifra_djelatnosti', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "\u0161ifra_djelatnosti", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Customer.prototype, "identifikacijski_broj", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'novčana_jedinica', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "nov\u010Dana_jedinica", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ name: 'dani_za_dospijeće', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "dani_za_dospije\u0107e", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "postotak_rabata", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "internet_stranica", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ name: 'transakcijski_račun', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "transakcijski_ra\u010Dun", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "ime_prezime_kontakta", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "telefon", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ name: 'elektronska_pošta', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "elektronska_po\u0161ta", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "naziv_za_slanje", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "adresa_za_slanje", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ name: 'država_za_slanje', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "dr\u017Eava_za_slanje", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ name: 'pošta_za_slanje', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "po\u0161ta_za_slanje", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ name: 'mjesto_pošte_za_slanje', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "mjesto_po\u0161te_za_slanje", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "naziv_primatelja", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "adresa_primatelja", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ name: 'država_primatelja', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "dr\u017Eava_primatelja", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ name: 'pošta_primatelja', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "po\u0161ta_primatelja", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "mjesto_primatelja", void 0);
__decorate([
    (0, graphql_1.Field)(() => [payment_slip_entity_1.PaymentSlip]),
    (0, typeorm_1.OneToMany)(() => payment_slip_entity_1.PaymentSlip, entity => entity.customer, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Customer.prototype, "paymentSlips", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "inserted_at", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "updated_at", void 0);
exports.Customer = Customer = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('customers')
], Customer);
//# sourceMappingURL=customer.entity.js.map