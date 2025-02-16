import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
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
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Field(() => Int)
  @Column({ type: 'integer' })
  customer_id: number;

  @Field(() => Int)
  @Column({ type: 'integer' })
  isp_id: number;

  @Field(() => Int)
  @Column({ type: 'int2', nullable: true, default: 1 })
  mjesec: number;

  @Field(() => Int)
  @Column({ type: 'int', nullable: true, default: new Date().getFullYear() })
  godina: number;

  @Field(() => Customer)
  @ManyToOne(() => Customer, entity => entity.paymentSlips, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  @Field(() => Isp)
  @ManyToOne(() => Isp, entity => entity.paymentSlips, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'isp_id', referencedColumnName: 'id' })
  isp: Isp;

  @Field(() => Float)
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 4,
    nullable: true,
    transformer: {
      to: (value: number): number => value,
      from: (value: string): number => (value !== null ? Number(parseFloat(value).toFixed(2)) : null),
    },
  })
  iznos: number;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  poziv_na_broj_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  poziv_na_broj_primatelja: string;

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

  @Field(() => Date)
  @CreateDateColumn()
  inserted_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => Date)
  @DeleteDateColumn()
  deleted_at: Date;
}
