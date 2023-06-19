import express, { NextFunction, Router, Request } from "express";
import { UsersController } from "./users.controller";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { BaseAbstractRoute } from "../common/abstract/route.absrtact";

/**
 * A class representing the UsersRouter, which extends the BaseAbstractRoute class.
 * This class is responsible for handling all user-related routes.
 */
export class UsersRouter extends BaseAbstractRoute {
  public controller: UsersController;
  constructor() {
    super();
    this.controller = new UsersController();
  }

  public initRouter() {
    this.router.post(
      "",
      (req: RequestUser, res: express.Response, next: NextFunction) => {
        this.controller.loginOrRegister(req, res, next);
      }
    );

    this.router.get(
      `/:id`,
      (req: RequestUser, res: express.Response, next: NextFunction) => {
        this.controller.getUser(req, res, next);
      }
    );

    this.router.put(
      ``,
      (req: RequestUser, res: express.Response, next: NextFunction) => {
        this.controller.updateUser(req, res, next);
      }
    );

    return this.router;
  }
}
