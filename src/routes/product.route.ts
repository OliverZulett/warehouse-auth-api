import * as express from 'express';
import { ProductController } from '../controllers/product/product.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
export class ProductRoute {
  private readonly productController: ProductController;

  constructor() {
    this.productController = new ProductController();
  }

  public routes(app: express.Application): void {
    app
      .route('/products')
      .get(
        LoggerMiddleware.logRequest,
        AuthMiddleware.validateToken,
        this.productController.getAllProducts
      );
    app
      .route('/products')
      .post(
        LoggerMiddleware.logRequest,
        AuthMiddleware.validateToken,
        AuthMiddleware.validateAdminRole,
        this.productController.createProduct
      );
    app
      .route('/products/:id')
      .get(
        LoggerMiddleware.logRequest,
        AuthMiddleware.validateToken,
        this.productController.findProductById
      );
    app
      .route('/products/:id')
      .put(
        LoggerMiddleware.logRequest,
        AuthMiddleware.validateToken,
        AuthMiddleware.validateAdminRole,
        this.productController.updateProductById
      );
    app
      .route('/products/:id')
      .delete(
        LoggerMiddleware.logRequest,
        AuthMiddleware.validateToken,
        AuthMiddleware.validateAdminRole,
        this.productController.deleteProductById
      );
  }
}
