import { Request, Response } from 'express';
import Logger from '../../lib/logger';
import { UserService } from '../../services/user/user.service';
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (req: Request, res: Response) => {
    const user = req.body;
    if (Object.keys(user).length === 0) {
      const errorMessage = 'User details cannot be empty';
      Logger.error(errorMessage);
      return res.status(400).send({
        error: errorMessage,
      });
    }
    try {
      const userToken = await this.userService.createUser(user);
      return res.status(201).send({
        token: userToken,
      });
    } catch (error: any) {
      Logger.error(error.message);
      return res.status(error.statusCode || 500).send({
        error: error.message,
      });
    }
  };
}
