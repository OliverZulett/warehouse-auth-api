import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dbConfig from './config/database.config';
import Logger from './lib/logger';
import { AuthRoute } from './routes/auth.route';
import { HealthCheckRoute } from './routes/healthCheck.route';
import { ProductRoute } from './routes/product.route';
import { UserRoute } from './routes/user.route';

class App {
  public app: express.Application;
  private healthCheckRoute: HealthCheckRoute;
  private productRoute: ProductRoute;
  private userRoute: UserRoute;
  private authRoute: AuthRoute;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(cors());
    this.dbConfiguration()
      .then(() => this.routes())
      .catch(error => Logger.error(`Error loading routes, ${error}`));
  }

  private async dbConfiguration() {
    await createConnection(dbConfig)
      .then(
        connection =>
          connection.isConnected &&
          Logger.info(`Database connected on PORT: ${process.env.DB_PORT}`)
      )
      .catch(error => Logger.error(`Error connecting database, ${error}`));
  }

  private routes() {
    this.healthCheckRoute = new HealthCheckRoute();
    this.productRoute = new ProductRoute();
    this.userRoute = new UserRoute();
    this.authRoute = new AuthRoute();
    this.healthCheckRoute.routes(this.app);
    this.productRoute.routes(this.app);
    this.userRoute.routes(this.app);
    this.authRoute.routes(this.app);
  }
}

export default new App().app;
