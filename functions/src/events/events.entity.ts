import { GuestsCategoryEntity } from "./../guestCategories/guestCategories.entity";
import { BaseEntity } from "../common/abstract/entity.abstract";
import { PackagesEnum } from "../common/enums/packages.enum";
import { EventsSettingsEntity } from "../eventSettings/eventsSettings.entity";
import { GuestEntity } from "../guests/guest.entity";
import { TablesEntity } from "../tables/tables.entity";
export class Planner {
  firstName: string;
  lastName: string;
  phone: string;
  roll: string;
}

export class EventsEntity extends BaseEntity {
  id: string;
  type: string;
  date: number;
  time: string;
  package: PackagesEnum;
  locationName: string;
  locationAddress: string;
  image: string;
  planners: Planner[];
  eventsSettings: EventsSettingsEntity;
  guestsCategory: GuestsCategoryEntity;
  tables: TablesEntity;
  guests: GuestEntity[];
}
