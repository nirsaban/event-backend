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

  /**
   * Logs in or registers a user based on the provided request object. If the user already exists,
   * their details are confirmed and they are logged in. Otherwise, they are registered and logged in.
   * @param {RequestUser} req - The request object containing user information.
   * @param {express.Response} res - The response object to send back to the client.
   * @param {NextFunction} next - The next function to call in the middleware chain.
   * @returns {Promise<void>} - A promise that resolves when the user is logged in or registered.
   * @throws {Error} - If there is an error creating or updating the user.
   */
  public async loginOrRegister(
    req: RequestUser,
    res: express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userExist = req.userExist;

      const user: UserDto = req.user;

      user.flow.register = true;

      if (userExist) {
        user.flow.confirmDetails = true;
        /**
         * Retrieves the user information for the given user ID.
         * @param {RequestUser} req - The request object containing the authenticated user's information.
         * @param {express.Response} res - The response object to send the user information to.
         * @param {NextFunction} next - The next function to call if there is an error.
         * @returns {Promise<any>} - A promise that resolves with the user information or rejects with an error.
         * @throws {NotFound} - If the user is not found in the database.
         */
      }
      let userLogged: UserDto = await this.usersService.createOrUpdateUser(
        user,
        userExist
      );

      res.send(userLogged);
    } catch (error) {
      next(error);
    }
  }

  public async getUser(
    req: RequestUser,
    res: express.Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const authUser: UserDto = req.user;
      const { id } = req.params;

      if (authUser.id === id) {
        return res.send(authUser);
      }
      throw new NotFound(
        "The user not found in our database please login again"
      );
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

      const userUpdated: UserDto = await this.usersService.updateUser(
        userUpdates
      );

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
