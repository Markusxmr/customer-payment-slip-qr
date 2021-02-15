import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Customer } from './customer.entity';
import { Isp } from './isp.entity';

@ObjectType()
@Entity('payment_slips')
export class PaymentSlip {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(() => Int)
  @Column({ type: 'integer' })
  @RelationId((entity: PaymentSlip) => entity.customer)
  customer_id: number;

  @Field(() => Int)
  @Column({ type: 'integer' })
  @RelationId((entity: PaymentSlip) => entity.customer)
  isp_id: number;

  @Field(() => Int)
  @Column({ type: 'int2', nullable: true, default: 1 })
  month: number;

  @Field(() => Int)
  @Column({ type: 'int4', nullable: true, default: new Date().getFullYear() })
  year: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 2, nullable: true })
  model: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 22, nullable: true })
  pnb: string;

  @Field(() => Float)
  @Column({ type: 'decimal', nullable: true })
  amount: number;

  @Field(() => String)
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field(() => Customer)
  @ManyToOne(() => Customer, (entity) => entity.paymentSlips, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  @Field(() => Isp)
  @ManyToOne(() => Isp, (entity) => entity.paymentSlips, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'isp_id', referencedColumnName: 'id' })
  isp: Isp;

  @Field(() => Date)
  @CreateDateColumn()
  inserted_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => Date)
  @DeleteDateColumn()
  deleted: Date;

  // Model for visual payment slip
  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  poziv_na_broj_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  poziv_na_broj_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', default: '000', nullable: true })
  iznos: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  iban_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  iban_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  model_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  model_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  sifra_namjene: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  datum_izvrsenja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  valuta_placanja: string;

  // Samo vrijednost X ili ništa
  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  hitno: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  ime_i_prezime_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  ulica_i_broj_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  ulica_i_broj_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  postanski_i_grad_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  postanski_i_grad_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  naziv_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  opis_placanja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  nalog: string;
}
