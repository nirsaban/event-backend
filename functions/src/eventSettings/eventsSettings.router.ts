import { BaseAbstractRoute } from "../common/abstract/route.absrtact";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { EventsController } from "../events/events.controller";
import { GuestsRouter } from "../guests/guest.router";
import express, { NextFunction, Router, Request } from "express";
import { EventsSettingsController } from "./eventsSettings.controller";

export class EventsSettingsRouter extends BaseAbstractRoute {
  public controller: EventsSettingsController;
  constructor() {
    super();
    this.controller = new EventsSettingsController();
  }

  public initRouter() {
    this.router.post("", (req: RequestUser, res: express.Response, next: NextFunction) => {
      this.controller.create(req, res, next);
    });

    this.router.get("", (req: RequestUser, res: express.Response, next: NextFunction) => {
      this.controller.getAll(req, res, next);
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
