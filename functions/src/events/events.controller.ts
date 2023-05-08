import express, { Request, NextFunction } from "express";
import { BadRequest, NotFound } from "../common/errors/general.error";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { UserDto } from "../users/users.dto";
import { EventsService } from "./events.service";
import { EventsDto } from "./events.dto";
import path from "path";
export interface MulterRequest extends RequestUser {
  files?: any;
}
export class EventsController {
  private eventsService: EventsService;
  constructor() {
    this.eventsService = new EventsService();
  }

  public async create(
    req: MulterRequest,
    res: express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const file = (req as MulterRequest).files[0];
      if (!file) {
        throw new BadRequest("No file uploaded.");
      }

      file.originalname = req.user.id + path.extname(file.originalname);

      const eventDto: EventsDto = new EventsDto({
        ...req.body,
        image: file.originalname,
      });

      await eventDto.validate(eventDto);

      const eventCreated: EventsDto = await this.eventsService.createEvent(
        req.user.id,
        eventDto,
        file
      );

      res.send(eventCreated);
    } catch (error) {
      next(error);
    }
  }
  public async getAll(
    req: RequestUser,
    res: express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const eventList: EventsDto[] = await this.eventsService.getAll(
        req.user.id
      );

      res.send(eventList);
    } catch (error) {
      next(error);
    }
  }

  public async update(
    req: RequestUser,
    res: express.Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;

      const eventDto: EventsDto = new EventsDto({ ...req.body, id });

      await eventDto.validateUpdate(eventDto);

      const eventUpdated: EventsDto = await this.eventsService.updateEvent(
        req.user.id,
        eventDto
      );

      res.send(eventUpdated);
    } catch (error) {
      next(error);
    }
  }

  public async get(
    req: RequestUser,
    res: express.Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;

      const eventUpdated: EventsDto = await this.eventsService.get(
        req.user.id,
        id
      );

      res.send(eventUpdated);
    } catch (error) {
      next(error);
    }
  }
  public async delete(
    req: RequestUser,
    res: express.Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      await this.eventsService.delete(userId, id);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}
