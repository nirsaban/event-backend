import { EventsEntity } from "../../events/events.entity";
import { UserDto } from "../../users/users.dto";

import express from "express";

export interface RequestUser extends express.Request {
  user?: UserDto;
  userExist?: boolean;
  event: EventsEntity;
}
