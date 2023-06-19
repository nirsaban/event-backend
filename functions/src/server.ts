require("./config/fb.config");
import { FBAuthMiddleware } from "./common/middlewares/fbAuth.middleware";
import { handleErrors } from "./common/middlewares/errorHandler.middleware";
import express, { Express, NextFunction, Request } from "express";
import cors from "cors";

const fileMiddleware = require("express-multipart-file-parser");
import { RouterApi } from "./routes";

/**
 * A class representing the Events API server.
 */
export class EventsApi {
  private app: Express;

  constructor() {
    this.app = express();

    this.app.use(cors());
    this.app.use(fileMiddleware);

    this.app.use(express.json());
    this.app.use(
      this.getApiPrefix(),
      new RouterApi().initRouter(),
      handleErrors
    );

    this.app.all("*", function (req, res) {
      res.status(404).send("what???");
    });
  }

  private getApiPrefix(): string {
    const apiPrefix = "/api/v1";

    return apiPrefix;
  }

  public export() {
    return this.app;
  }

  public async start(port: number) {
    return await new Promise((resolve, reject) => {
      this.app.listen(port, () => {
        resolve(port);
      });
    });
  }
}
