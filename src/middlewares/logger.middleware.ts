import { NextFunction, Request, Response } from 'express';
import Logger from '../lib/logger';

export class LoggerMiddleware {
  public static logRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const method = `METHOD: ${req.method}`;
    const uri = `URI: ${req.url}`;
    let body = '';
    if (Object.keys(req.body).length > 0) {
      body = `BODY: ${JSON.stringify(req.body)}`;
    }
    Logger.http(`${method} | ${uri} | ${body}`);
    next();
  };
}
