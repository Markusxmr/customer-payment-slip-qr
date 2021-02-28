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
exports.PaymentSlip = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const customer_entity_1 = require("./customer.entity");
const isp_entity_1 = require("./isp.entity");
let PaymentSlip = class PaymentSlip {
};
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' }),
    __metadata("design:type", Number)
], PaymentSlip.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({ type: 'integer' }),
    typeorm_1.RelationId((entity) => entity.customer),
    __metadata("design:type", Number)
], PaymentSlip.prototype, "customer_id", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({ type: 'integer' }),
    typeorm_1.RelationId((entity) => entity.customer),
    __metadata("design:type", Number)
], PaymentSlip.prototype, "isp_id", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({ type: 'int2', nullable: true, default: 1 }),
    __metadata("design:type", Number)
], PaymentSlip.prototype, "mjesec", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({ type: 'int4', nullable: true, default: new Date().getFullYear() }),
    __metadata("design:type", Number)
], PaymentSlip.prototype, "godina", void 0);
__decorate([
    graphql_1.Field(() => customer_entity_1.Customer),
    typeorm_1.ManyToOne(() => customer_entity_1.Customer, entity => entity.paymentSlips, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'customer_id', referencedColumnName: 'id' }),
    __metadata("design:type", customer_entity_1.Customer)
], PaymentSlip.prototype, "customer", void 0);
__decorate([
    graphql_1.Field(() => isp_entity_1.Isp),
    typeorm_1.ManyToOne(() => isp_entity_1.Isp, entity => entity.paymentSlips, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'isp_id', referencedColumnName: 'id' }),
    __metadata("design:type", isp_entity_1.Isp)
], PaymentSlip.prototype, "isp", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float),
    typeorm_1.Column({ type: 'numeric', precision: 10, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], PaymentSlip.prototype, "iznos", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "poziv_na_broj_platitelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "poziv_na_broj_primatelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "iban_primatelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "iban_platitelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "model_primatelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "model_platitelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "sifra_namjene", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "datum_izvrsenja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "valuta_placanja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "hitno", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "ime_i_prezime_platitelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "ulica_i_broj_platitelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "ulica_i_broj_primatelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "postanski_i_grad_platitelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "postanski_i_grad_primatelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "naziv_primatelja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "opis_placanja", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PaymentSlip.prototype, "nalog", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], PaymentSlip.prototype, "inserted_at", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], PaymentSlip.prototype, "updated_at", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], PaymentSlip.prototype, "deleted_at", void 0);
PaymentSlip = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('payment_slips')
], PaymentSlip);
exports.PaymentSlip = PaymentSlip;
//# sourceMappingURL=payment-slip.entity.js.map