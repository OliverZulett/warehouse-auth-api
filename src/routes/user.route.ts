import * as express from 'express';
import { UserController } from '../controllers/user/user.controller';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
export class UserRoute {
  private userController: UserController;
  constructor() {
    this.userController = new UserController();
  }

  public routes(app: express.Application) {
    app
      .route('/users')
      .post(LoggerMiddleware.logRequest, this.userController.createUser);
  }
}
