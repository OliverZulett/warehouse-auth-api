import 'reflect-metadata';
import { EntityRepository, Repository } from 'typeorm';
import { ProductEntity } from '../entity/product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {}
