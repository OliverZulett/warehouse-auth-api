import * as express from 'express';
import { AuthController } from '../controllers/auth/auth.controller';
export class AuthRoute {
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
  }

  routes(app: express.Application) {
    app.route('/singUp').post(this.authController.singUp);
    app.route('/singIn').post(this.authController.singIn);
  }
}
