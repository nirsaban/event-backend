import express, { NextFunction } from "express";
import { RequestUser } from "../common/interfaces/requestUser.interface";

import { TasksDto } from "./tasks.dto";
import { TasksService } from "./tasks.service";

export class TasksController {
  private tasksService: TasksService;
  constructor() {
    this.tasksService = new TasksService();
  }

  public async create(req: RequestUser, res: express.Response, next: NextFunction): Promise<void> {
    try {
      const tasksDto: TasksDto = new TasksDto({ ...req.body });

      await tasksDto.validate(tasksDto);

      const tasksCreated: TasksDto = await this.tasksService.create(
        req.user.id,
        req.params.eventId,
        tasksDto
      );

      res.send(tasksCreated);
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: RequestUser, res: express.Response, next: NextFunction): Promise<void> {
    try {
      const eventList: TasksDto[] = await this.tasksService.getAll(req.user.id, req.params.eventId);

      res.send(eventList);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      const tasksDto: TasksDto = new TasksDto({ ...req.body, id });

      await tasksDto.validateUpdate(tasksDto);

      const eventUpdated: TasksDto = await this.tasksService.update(
        req.user.id,
        req.params.eventId,
        tasksDto
      );

      res.send(eventUpdated);
    } catch (error) {
      next(error);
    }
  }

  public async get(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      const eventUpdated: TasksDto = await this.tasksService.get(
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

      await this.tasksService.delete(userId, req.params.eventId, id);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}
