import { plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { getConnection } from 'typeorm';
import { ProductEntity } from '../../entity/product.entity';
import { GeneralException } from '../../exceptions/generalException';
import { Product } from '../../models/product';
import { ProductRepository } from '../../repository/product.repository';
import { ProviderRepository } from '../../repository/provider.repository';

export class ProductService {
  private productRepository: ProductRepository;
  private providerRepository: ProviderRepository;

  constructor() {
    this.productRepository =
      getConnection('warehouse').getCustomRepository(ProductRepository);
    this.providerRepository =
      getConnection('warehouse').getCustomRepository(ProviderRepository);
  }

  async createProduct(product: Product): Promise<ProductEntity> {
    const provider = await this.providerRepository.findOne(product.providerId);
    if (provider) {
      const productForSave = plainToClass(ProductEntity, product);
      productForSave.provider = provider;
      return this.productRepository
        .save(productForSave)
        .then(productCreated => productCreated)
        .catch(error => {
          throw new GeneralException(
            `Error creating product: ${error.message}`,
            404
          );
        });
    } else {
      throw new GeneralException('Product provider not found', 404);
    }
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findProductById(id: string): Promise<ProductEntity> {
    const productFound = await this.productRepository.findOne(id);
    if (productFound) {
      return productFound;
    } else {
      throw new GeneralException('Product not found', 404);
    }
  }

  async updateProductById(
    id: string,
    product: Product
  ): Promise<ProductEntity> {
    const provider = await this.providerRepository.findOne(product.providerId);
    if (provider) {
      let productForUpdate = await this.findProductById(id);
      productForUpdate = { ...productForUpdate, ...product };
      productForUpdate.provider = provider;
      return this.productRepository
        .save(productForUpdate)
        .then(productCreated => productCreated)
        .catch(error => {
          throw new GeneralException(
            `Error creating product: ${error.message}`,
            404
          );
        });
    } else {
      throw new GeneralException('Product provider not found', 404);
    }
  }

  async deleteProductById(id: string): Promise<void> {
    const productForUpdate = await this.findProductById(id);
    await this.productRepository.delete(productForUpdate.id);
  }
}
