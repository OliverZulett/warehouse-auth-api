import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProviderEntity } from './provider.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @Column('varchar', { name: 'color', length: 200 })
  color: string;

  @Column('decimal', { name: 'price', precision: 5, scale: 2 })
  price: number;

  @Column('varchar', { name: 'model', length: 50 })
  model: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ProviderEntity, providerEntity => providerEntity.products, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'provider' })
  provider: ProviderEntity;
}
