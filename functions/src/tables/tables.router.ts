import express, { NextFunction, Router, Request } from "express";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { BaseAbstractRoute } from "../common/abstract/route.absrtact";
import { TablesController } from "./tables.controller";
import { getCurrentEvent } from "../common/middlewares/currentEvent.middleware";
export class TablesRouter extends BaseAbstractRoute {
  public controller: TablesController;

  constructor() {
    super();
    this.controller = new TablesController();
  }

  public initRouter() {
    this.router.post(
      "",
      getCurrentEvent,
      async (req: RequestUser, res: express.Response, next: NextFunction) => {
        await this.controller.create(req, res, next);
      }
    );

    this.router.get("", async (req: RequestUser, res: express.Response, next: NextFunction) => {
      await this.controller.getAll(req, res, next);
    });

    this.router.put(`/:id`, async (req: RequestUser, res: express.Response, next: NextFunction) => {
      await this.controller.update(req, res, next);
    });

    this.router.get(`/:id`, async (req: RequestUser, res: express.Response, next: NextFunction) => {
      await this.controller.get(req, res, next);
    });

    this.router.delete(
      `/:id`,
      async (req: RequestUser, res: express.Response, next: NextFunction) => {
        await this.controller.delete(req, res, next);
      }
    );

    return this.router;
  }
}
