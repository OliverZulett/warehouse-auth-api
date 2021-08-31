import * as express from 'express';
import { HealthCheckController } from '../controllers/healthCheck/healthCheck.controller';
import { LoggerMiddleware } from '../middlewares/logger.middleware';

export class HealthCheckRoute {
  private readonly healthCheckController: HealthCheckController;

  constructor() {
    this.healthCheckController = new HealthCheckController();
  }

  public routes(app: express.Application): void {
    app
      .route('/healthCheck')
      .get(LoggerMiddleware.logRequest, this.healthCheckController.checkHealth);
  }
}
