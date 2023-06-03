import express, { Request, NextFunction } from "express";
import { NotFound } from "../common/errors/general.error";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { UserDto } from "../users/users.dto";
import { EventsSettingsService } from "./eventsSettings.service";
import { EventsSettingsDto } from "./eventsSettings.dto";
import { UsersService } from "../users/users.service";

export class EventsSettingsController {
  private eventsService: EventsSettingsService;
  private userService : UsersService
  constructor() {
    this.eventsService = new EventsSettingsService();
    this.userService = new UsersService()
  }

  public async create(req: RequestUser, res: express.Response, next: NextFunction): Promise<void> {
    try {
      const eventDto: EventsSettingsDto = new EventsSettingsDto({ ...req.body });

      await eventDto.validate(eventDto);

      const eventCreated: EventsSettingsDto = await this.eventsService.create(
        req.user.id,
        req.params.eventId,
        eventDto
      );

      if(eventCreated){
        const userDto   = {
          ...req.user,
          flow : {
            ...req.user.flow,
            settings : true,
            onGoing : true
          }
        }
        this.userService.updateUser(new UserDto({...userDto} as UserDto))
      } 
      res.send(eventCreated);
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: RequestUser, res: express.Response, next: NextFunction): Promise<void> {
    try {
      const eventList: EventsSettingsDto[] = await this.eventsService.getAll(
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

      const eventDto: EventsSettingsDto = new EventsSettingsDto({ ...req.body, id });

      await eventDto.validateUpdate(eventDto);

      const eventUpdated: EventsSettingsDto = await this.eventsService.update(
        req.user.id,
        req.params.eventId,
        eventDto
      );

      res.send(eventUpdated);
    } catch (error) {
      next(error);
    }
  }

  public async get(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      const eventUpdated: EventsSettingsDto = await this.eventsService.get(
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

      await this.eventsService.delete(userId, req.params.eventId, id);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}
