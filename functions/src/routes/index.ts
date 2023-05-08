import { EventsRouter } from "./../events/events.router";
import { Router, NextFunction } from "express";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { FBAuthMiddleware } from "../common/middlewares/fbAuth.middleware";
import { BaseAbstractRoute } from "../common/abstract/route.absrtact";
import express from "express";
import { UsersRouter } from "../users/users.router";

export class RouterApi extends BaseAbstractRoute {
  controller: any;

  constructor() {
    super();
  }

  public initRouter(): Router {
    this.applyMiddleware([
      async (req: RequestUser, res: express.Response, next: NextFunction) =>
        await new FBAuthMiddleware().init(req, res, next),
    ]);

    this.init("users", new UsersRouter());

    this.init("events", new EventsRouter());

    //return response  404
    this.router.all("*", function (req, res) {
      return res.status(404).json({
        status: "error",
        message: "Not Found",
      });
    });

    return this.router;
  }
}
