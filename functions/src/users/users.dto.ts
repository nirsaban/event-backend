import { IsString, IsOptional, IsEmail } from "class-validator";

import { DecodedIdToken } from "firebase-admin/auth";
import { Settings } from "firebase-admin/firestore";
import { UsersEntity } from "./users.entity";
import { BaseDto } from "../common/abstract/dto.abstract";
import { EventsDto } from "../events/events.dto";
import { UserFlow } from "../common/interfaces/userflow";
import { IsPhoneNumber } from "class-validator-multi-lang";

export class UserDto extends BaseDto<UserDto, UsersEntity> {
  public id: string;

  @IsOptional()
  @IsString()
  public firstName: string;

  @IsOptional()
  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsPhoneNumber("IL")
  public phone: string;

  @IsString()
  public provider: string;

  @IsOptional()
  public events: EventsDto[];

  @IsOptional()
  public flow: UserFlow;

  constructor(user: UserDto) {
    super();
    this.id = user.id;
    this.email = user.email;
    this.phone = user.phone;
    this.provider = user.provider;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.events = user.events;
    this.flow = new UserFlow(user.flow);

  }

  static FBUserTLocalUser(fbUser: DecodedIdToken): UserDto {
    let retVal = {} as UserDto;

    let firstName, lastName: string;

    if (fbUser?.name) {
      [firstName, lastName] = fbUser.name.split(" ");
    }

    if (!firstName) {
      firstName = fbUser?.email?.split("@")[0] || "";
    }

    retVal.id = fbUser.uid;
    retVal.firstName = firstName;
    retVal.lastName = lastName;
    retVal.email = fbUser.email;
    retVal.phone = fbUser.phone;
    retVal.provider = fbUser.firebase.sign_in_provider;
    return retVal;
  }
}
