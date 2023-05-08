import express, { NextFunction } from "express";
import { BaseAbstractRoute } from "../common/abstract/route.absrtact";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { GuestsCategoryController } from "./guestCategories.controller";

export class GuestsCategoryRouter extends BaseAbstractRoute {
  public controller: GuestsCategoryController;

  constructor() {
    super();
    this.controller = new GuestsCategoryController();
  }

  public initRouter() {
    this.router.get("", async (req: RequestUser, res: express.Response, next: NextFunction) => {
      await this.controller.getAll(req, res, next);
    });
    return this.router;
  }
}
