import express, { NextFunction, Router, Request } from "express";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { GuestsController } from "./guest.controller";
import { BaseAbstractRoute } from "../common/abstract/route.absrtact";

export class GuestsRouter extends BaseAbstractRoute {
  public controller: GuestsController;

  constructor() {
    super();
    this.controller = new GuestsController();
  }

  public initRouter() {
    this.router.post("", async (req: RequestUser, res: express.Response, next: NextFunction) => {
      await this.controller.create(req, res, next);
    });

    this.router.get("", async (req: RequestUser, res: express.Response, next: NextFunction) => {
      await this.controller.getAll(req, res, next);
    });

    this.router.put(`/:id`, async (req: RequestUser, res: express.Response, next: NextFunction) => {
      await this.controller.update(req, res, next);
    });

    this.router.get(`/:id`, async (req: RequestUser, res: express.Response, next: NextFunction) => {
      await this.controller.get(req, res, next);
    });

    this.router.get(
      `/sort/:attr/`,
      async (req: RequestUser, res: express.Response, next: NextFunction) => {
        await this.controller.sort(req, res, next);
      }
    );

    this.router.delete(
      `/:id`,
      async (req: RequestUser, res: express.Response, next: NextFunction) => {
        await this.controller.delete(req, res, next);
      }
    );

    return this.router;
  }
}
