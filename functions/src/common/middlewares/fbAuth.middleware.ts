import { UsersEntity } from "./../../users/users.entity";
import { DecodedIdToken } from "firebase-admin/auth";
import express, { NextFunction, Request, request } from "express";
import { UsersService } from "../../users/users.service";
import { UserDto } from "../../users/users.dto";
import * as admin from "firebase-admin";
import { UnAuthorized, NotFound, BadRequest } from "../errors/general.error";
import { isNullOrUndefined } from "../utils";
import { RequestUser } from "../interfaces/requestUser.interface";

export class FBAuthMiddleware {
  private fbUser: DecodedIdToken;
  private usersService: UsersService;
  private userDto: UserDto;

  constructor() {
    this.usersService = new UsersService();
  }

  public async init(req: RequestUser, res: express.Response, next: NextFunction): Promise<any> {
    try {
      //No need to authenticate get token requests
      if (this.isTokenRoute(req)) {
        return next();
      }

      const token = req.headers?.authorization?.split(" ")[1];

      this.fbUser = await admin.auth().verifyIdToken(token, true);

      if (isNullOrUndefined(this.fbUser)) {
        throw new UnAuthorized("unauthorized , user credential not valid");
      }

      const userEntity: UserDto = await this.usersService.getUserByFBId(this.fbUser.uid);

      if (isNullOrUndefined(userEntity)) {
        this.userDto = new UserDto(UserDto.FBUserTLocalUser(this.fbUser));
      } else {
        this.userDto = new UserDto(userEntity);
        console.log(this.userDto);
      }

      await this.userDto.validate(this.userDto);

      req.user = this.userDto;

      req.userExist = !isNullOrUndefined(userEntity);

      return next();
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequest) {
        return res.status(error.getCode()).send({ errorMessage: error.message });
      }
      res.status(401).send({
        status: "error",
        message: error.message,
      });
    }
  }

  isTokenRoute(request: Request): boolean {
    return request.method === "POST" && request.url.endsWith("/users/token");
  }
  isLoginRoute(request: Request): boolean {
    return request.method === "GET" && request.url.endsWith("users");
  }
}
