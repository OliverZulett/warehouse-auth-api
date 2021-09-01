import { Request, Response } from 'express';
import Logger from '../../lib/logger';
import { AuthService } from '../../services/auth/auth.service';
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public singIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      const errorMessage = 'email and password are required';
      Logger.error(errorMessage);
      return res.status(400).send({
        error: errorMessage,
      });
    }
    try {
      const token = await this.authService.singIn(email, password);
      return res.status(201).send({
        token: token,
      });
    } catch (error: any) {
      Logger.error(error.message);
      return res.status(error.statusCode || 500).send({
        error: error.message,
      });
    }
  };

  public singUp = async (req: Request, res: Response) => {
    const user = req.body;
    if (Object.keys(user).length === 0) {
      const errorMessage = 'User details cannot be empty';
      Logger.error(errorMessage);
      return res.status(400).send({
        error: errorMessage,
      });
    }
    try {
      const token = await this.authService.singUp(user);
      return res.status(201).send({
        token: token,
      });
    } catch (error: any) {
      Logger.error(error.message);
      return res.status(error.statusCode || 500).send({
        error: error.message,
      });
    }
  };
}
