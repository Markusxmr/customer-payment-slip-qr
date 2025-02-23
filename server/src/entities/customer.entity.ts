import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PaymentSlip } from './payment-slip.entity';

@ObjectType()
@Entity('customers')
export class Customer {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Field(() => Int)
  @Column({ name: 'šifra', type: 'integer', unique: true, nullable: true })
  šifra: number;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  naziv: string;

  @Field(() => Number)
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
  obveza;

  @Field(() => Number)
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
  iznos_opreme;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  adresa: string;

  @Field(() => String)
  @Column({ name: 'država', type: 'varchar', nullable: true })
  država: string;

  @Field(() => Int)
  @Column({ name: 'pošta', type: 'integer', nullable: true })
  pošta: number;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  mjesto: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  porezni_obveznik: string;

  @Field(() => Int)
  @Column({ type: 'bigint', nullable: true })
  oib: number;

  @Field(() => Int)
  @Column({ name: 'matični_broj', type: 'bigint', nullable: true })
  matični_broj: number;

  @Field(() => String)
  @Column({ name: 'šifra_djelatnosti', type: 'varchar', nullable: true })
  šifra_djelatnosti: string;

  @Field(() => Int)
  @Column({ type: 'bigint', nullable: true })
  identifikacijski_broj: number;

  @Column({ name: 'novčana_jedinica', type: 'varchar', nullable: true })
  novčana_jedinica: string;

  @Field(() => String)
  @Column({ name: 'dani_za_dospijeće', type: 'varchar', nullable: true })
  dani_za_dospijeće: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  postotak_rabata: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  internet_stranica: string;

  @Field(() => String)
  @Column({ name: 'transakcijski_račun', type: 'varchar', nullable: true })
  transakcijski_račun: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  ime_prezime_kontakta: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  telefon: string;

  @Field(() => String)
  @Column({ name: 'elektronska_pošta', type: 'varchar', nullable: true })
  elektronska_pošta: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  naziv_za_slanje: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  adresa_za_slanje: string;

  @Field(() => String)
  @Column({ name: 'država_za_slanje', type: 'varchar', nullable: true })
  država_za_slanje: string;

  @Field(() => String)
  @Column({ name: 'pošta_za_slanje', type: 'varchar', nullable: true })
  pošta_za_slanje: string;

  @Field(() => String)
  @Column({ name: 'mjesto_pošte_za_slanje', type: 'varchar', nullable: true })
  mjesto_pošte_za_slanje: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  naziv_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  adresa_primatelja: string;

  @Field(() => String)
  @Column({ name: 'država_primatelja', type: 'varchar', nullable: true })
  država_primatelja: string;

  @Field(() => String)
  @Column({ name: 'pošta_primatelja', type: 'varchar', nullable: true })
  pošta_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  mjesto_primatelja: string;

  @Field(() => [PaymentSlip])
  @OneToMany(() => PaymentSlip, entity => entity.customer, {
    eager: true,
  })
  paymentSlips: PaymentSlip[];

  @Field(() => Date)
  @CreateDateColumn()
  inserted_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
