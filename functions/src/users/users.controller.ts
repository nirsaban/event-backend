import { NotFound } from "../common/errors/general.error";
import { RequestUser } from "../common/interfaces/requestUser.interface";
import { UserFlow } from "../common/interfaces/userflow";
import { UserDto } from "./users.dto";
import { UsersService } from "./users.service";
import express, { Request, NextFunction } from "express";
export class UsersController {
  private usersService: UsersService;
  constructor() {
    this.usersService = new UsersService();
  }

  public async loginOrRegister(
    req: RequestUser,
    res: express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userExist = req.userExist;

      const user: UserDto = req.user;

      user.flow.register = true;

      if(userExist){
        user.flow.confirmDetails = true;
      }
      let userLogged: UserDto = await this.usersService.createOrUpdateUser(user, userExist);

      res.send(userLogged);
    } catch (error) {
      next(error);
    }
  }

  public async getUser(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      const authUser: UserDto = req.user;
      const { id } = req.params;

      if (authUser.id === id) {
        return res.send(authUser);
      }
      throw new NotFound("The user not found in our database please login again");
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(
    req: RequestUser,
    res: express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userUpdates: UserDto = new UserDto(req.body);

      userUpdates.id = req.user.id;

      await userUpdates.validateUpdate(userUpdates);

      const userUpdated: UserDto = await this.usersService.updateUser(userUpdates);

      const user = req.user;

      for (let field in userUpdates) {
        user[field] = userUpdates[field] || user[field];
      }

      res.send(user);
    } catch (error) {
      next(error);
    }
  }
}
