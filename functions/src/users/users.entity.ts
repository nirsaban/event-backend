import { BaseEntity } from "../common/abstract/entity.abstract";
import { EventsEntity } from "../events/events.entity";

export class UsersEntity extends BaseEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  provider: string;
  events: EventsEntity[];
}
