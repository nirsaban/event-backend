import { BaseDto } from "../common/abstract/dto.abstract";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { GuestStatusEnum } from "../common/enums/guestStatus.enum";
import { v4 as uuidv4 } from "uuid";
import { GuestEntity } from "../guests/guest.entity";
import { TablesEntity } from "./tables.entity";
import { GuestDto } from "../guests/guest.dto";
import { EventsEntity } from "../events/events.entity";

export enum TableTypeEnum {
  knights = "knights",
  regular = "regular",
  reserve = "reserve",
}

export class TablesDto extends BaseDto<TablesDto, TablesEntity> {
  @IsString()
  id: string;

  @IsNumber()
  number: number;

  @IsEnum(TableTypeEnum)
  type: TableTypeEnum;

  @IsString()
  category: string;

  guests: GuestDto[];

  @IsBoolean()
  isFull: boolean;

  constructor(tableDto: TablesDto, event: EventsEntity) {
    super();

    this.id = tableDto.id || tableDto.number.toString();

    this.number = tableDto.number;

    this.type = tableDto.type;

    this.category = tableDto.category;

    this.guests = tableDto?.guests?.map((guest) => {
      return { ...new GuestDto(guest) } as GuestDto;
    });

    this.isFull = this.getIsFull(event);
  }

  getIsFull(event: EventsEntity): boolean {
    if (this.type === "regular" && this.guests.length === event?.eventsSettings[0].tableSits) {
      return true;
    } else if (
      this.type === "knights" &&
      this.guests.length === event?.eventsSettings[0].tableSits
    ) {
      return true;
    }
    if (this.type === "reserve" && this.guests.length === event?.eventsSettings[0].tableSits) {
      return true;
    }

    return false;
  }
}
