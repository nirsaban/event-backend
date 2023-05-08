import { GuestsRouter } from "./../guests/guest.router";
import express, { NextFunction, Router, Request } from "express";
import { EventsController } from "./events.controller";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { BaseAbstractRoute } from "../common/abstract/route.absrtact";
import { GuestsCategoryRouter } from "../guestCategories/guestCategories.router";
import { EventsSettingsRouter } from "../eventSettings/eventsSettings.router";
import { TablesRouter } from "../tables/tables.router";
import { TasksRouter } from "../taskManager/tasks.router";

export class EventsRouter extends BaseAbstractRoute {
  public controller: EventsController;
  constructor() {
    super();
    this.controller = new EventsController();
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

    //Event's children routes

    this.init(":eventId/guests", new GuestsRouter());
    this.init(":eventId/guestscategory", new GuestsCategoryRouter());
    this.init(":eventId/settings", new EventsSettingsRouter());
    this.init(":eventId/tables", new TablesRouter());
    this.init(":eventId/tasks", new TasksRouter());

    return this.router;
  }
}
