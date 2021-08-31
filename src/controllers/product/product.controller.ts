import { Request, Response } from 'express';
import Logger from '../../lib/logger';
import { ProductService } from '../../services/product/product.service';
export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public createProduct = async (req: Request, res: Response) => {
    const productForCreate = req.body;
    if (Object.keys(productForCreate).length === 0) {
      const errorMessage = 'Product details cannot be empty';
      Logger.error(errorMessage);
      return res.status(400).send({
        error: errorMessage,
      });
    }
    try {
      const productCreated = await this.productService.createProduct(
        productForCreate
      );
      return res.status(201).send(productCreated);
    } catch (error: any) {
      Logger.error(error.message);
      return res.status(error.statusCode).send({
        error: error.message,
      });
    }
  };

  public getAllProducts = async (req: Request, res: Response) => {
    const products = await this.productService.getAllProducts();
    return res.status(200).send({
      total: products.length,
      products: products,
    });
  };

  public findProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
      const product = await this.productService.findProductById(productId);
      return res.status(200).send(product);
    } catch (error: any) {
      Logger.error(error.message);
      return res.status(error.statusCode).send({
        error: error.message,
      });
    }
  };

  public updateProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const productForUpdate = req.body;
    if (Object.keys(productForUpdate).length === 0) {
      const errorMessage = 'Product details cannot be empty';
      Logger.error(errorMessage);
      return res.status(400).send({
        error: errorMessage,
      });
    }
    try {
      const productUpdated = await this.productService.updateProductById(
        productId,
        productForUpdate
      );
      return res.status(200).send(productUpdated);
    } catch (error: any) {
      Logger.error(error.message);
      return res.status(error.statusCode).send({
        error: error.message,
      });
    }
  };

  public deleteProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
      await this.productService.deleteProductById(productId);
      return res.status(200).send({
        message: 'Product deleted sucessfull',
      });
    } catch (error: any) {
      Logger.error(error.message);
      return res.status(error.statusCode).send({
        error: error.message,
      });
    }
  };
}
