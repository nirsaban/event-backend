import { GuestEntity } from "./guest.entity";
import { GuestDto } from "./guest.dto";
import express, { Request, NextFunction } from "express";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { GuestsService } from "./guest.service";

export class GuestsController {
  private guestService: GuestsService;
  constructor() {
    this.guestService = new GuestsService();
  }

  public async create(req: RequestUser, res: express.Response, next: NextFunction): Promise<void> {
    try {
      const guestDto: GuestDto = new GuestDto({ ...req.body });

      await guestDto.validate(guestDto);

      const eventCreated: GuestDto = await this.guestService.create(
        req.user.id,
        req.params.eventId,
        guestDto
      );

      res.send(eventCreated);
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: RequestUser, res: express.Response, next: NextFunction): Promise<void> {
    try {
      const eventList: GuestDto[] = await this.guestService.getAll(req.user.id, req.params.eventId);

      res.send(eventList);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      const guestDto: GuestDto = new GuestDto({ ...req.body, id });

      await guestDto.validateUpdate(guestDto);

      const eventUpdated: GuestDto = await this.guestService.update(
        req.user.id,
        req.params.eventId,
        guestDto
      );

      res.send(eventUpdated);
    } catch (error) {
      next(error);
    }
  }

  public async get(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      const eventUpdated: GuestDto = await this.guestService.get(
        req.user.id,
        req.params.eventId,
        id
      );

      res.send(eventUpdated);
    } catch (error) {
      next(error);
    }
  }

  public async sort(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      const guestsSorted: GuestDto = await this.guestService.sort(
        req.user.id,
        req.params.eventId,
        req.params.attr as keyof GuestEntity
      );

      res.send(guestsSorted);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      await this.guestService.delete(userId, req.params.eventId, id);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}
