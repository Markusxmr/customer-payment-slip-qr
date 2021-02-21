import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PaymentSlip } from './payment-slip.entity';

@ObjectType()
@Entity('isps')
export class Isp {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(() => Int)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => Int)
  @Column({ type: 'varchar', nullable: true })
  street: string;

  @Field(() => Int)
  @Column({ type: 'integer', nullable: true })
  postalCode: number;

  @Field(() => Int)
  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Field(() => Int)
  @Column({ type: 'bigint', nullable: true })
  oib: number;

  @Field(() => Int)
  @Column({ type: 'varchar', length: 21, nullable: true })
  iban: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false, nullable: true })
  defaultIsp: boolean;

  @Field(() => [PaymentSlip])
  @OneToMany(() => PaymentSlip, (entity) => entity.isp, {
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
