import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
@Entity('global_settings')
export class GlobalSetting {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(() => Float)
  @Column({ type: 'decimal', nullable: true })
  paymentSlipPrintScale: number;

  @Field(() => Int)
  @Column({ type: 'integer', nullable: true })
  paymentSlipMarginTop: number;

  @Field(() => Date)
  @CreateDateColumn()
  inserted_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
