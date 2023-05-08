import express, { Request, NextFunction } from "express";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { GuestsCategoryService } from "./GuestsCategory.service";
import { GuestsCategoryEntity } from "./guestCategories.entity";

export class GuestsCategoryController {
  private guestService: GuestsCategoryService;
  constructor() {
    this.guestService = new GuestsCategoryService();
  }

  public async getAll(req: RequestUser, res: express.Response, next: NextFunction): Promise<void> {
    try {
      const categoryList: GuestsCategoryEntity[] = await this.guestService.getAll(
        req.user.id,
        req.params.eventId
      );

      res.send(categoryList);
    } catch (error) {
      next(error);
    }
  }
}
