import { BaseEntity } from "../common/abstract/entity.abstract";
import { PackagesEnum } from "../common/enums/packages.enum";
import { GuestEntity } from "../guests/guest.entity";

export class EventsSettingsEntity extends BaseEntity {
  id: string;

  guestAmount: number;

  maxBudget: number;

  reserve: number;

  tableSits: number;

  knightsTableSits: number;
}
