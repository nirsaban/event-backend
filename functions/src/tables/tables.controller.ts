import express, { NextFunction } from "express";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { GuestEntity } from "../guests/guest.entity";
import { GuestsService } from "../guests/guest.service";
import { TablesDto } from "./tables.dto";
import { TablesService } from "./tables.service";

export class TablesController {
  private tablesService: TablesService;
  constructor() {
    this.tablesService = new TablesService();
  }

  public async create(req: RequestUser, res: express.Response, next: NextFunction): Promise<void> {
    try {
      const tablesDto: TablesDto = new TablesDto({ ...req.body }, req.event);

      const eventSetting = await tablesDto.validate(tablesDto);

      const tablesCreated: TablesDto = await this.tablesService.create(
        req.user.id,
        req.params.eventId,
        tablesDto
      );

      res.send(tablesDto);
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: RequestUser, res: express.Response, next: NextFunction): Promise<void> {
    try {
      const eventList: TablesDto[] = await this.tablesService.getAll(
        req.user.id,
        req.params.eventId
      );

      res.send(eventList);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      const tablesDto: TablesDto = new TablesDto({ ...req.body, id }, req.event);

      await tablesDto.validateUpdate(tablesDto);

      const eventUpdated: TablesDto = await this.tablesService.update(
        req.user.id,
        req.params.eventId,
        tablesDto
      );

      res.send(eventUpdated);
    } catch (error) {
      next(error);
    }
  }

  public async get(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      const eventUpdated: TablesDto = await this.tablesService.get(
        req.user.id,
        req.params.eventId,
        id
      );

      res.send(eventUpdated);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      await this.tablesService.delete(userId, req.params.eventId, id);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}
