import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import * as jwt from 'jsonwebtoken';
import path from 'path';

export interface RequestCustomInterface extends Request {
  userId: any;
}

export class AuthMiddleware {
  public static validateToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      const PUBLIC_KEY = fs.readFileSync(
        path.join(process.cwd(), '/certs/auth/publickey.crt')
      );
      try {
        const encrypted: any = jwt.verify(bearerToken, PUBLIC_KEY);
        req.userId = encrypted.userId;
        req.userRole = encrypted.userRole;
        next();
      } catch (error) {
        return res.status(403).json({ message: 'unauthorized, invalid token' });
      }
    } else {
      return res
        .status(403)
        .json({ message: 'unauthorized, no token provided' });
    }
  };

  public static validateAdminRole = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.userRole);
    const userRole = req.userRole;
    if (!userRole || userRole !== 'admin')
      return res.status(403).json({ message: 'unauthorized, invalid role' });
    next();
  };
}
