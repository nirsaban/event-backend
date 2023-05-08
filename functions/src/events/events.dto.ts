import {
  IsArray,
  IsEnum,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { BaseDto } from "../common/abstract/dto.abstract";
import { PackagesEnum } from "../common/enums/packages.enum";
import { GuestEntity } from "../guests/guest.entity";
import { EventsEntity, Planner } from "./events.entity";
import { v4 as uuidv4 } from "uuid";
import { IsNumberString } from "class-validator-multi-lang";
import { Transform, Type } from "class-transformer";

export class EventsDto extends BaseDto<EventsDto, EventsEntity> {
  @IsString()
  id: string;
  @IsString()
  type: string;

  @IsNumberString()
  date: number;

  @IsString()
  time: string;

  @IsOptional()
  @IsEnum(PackagesEnum)
  package?: PackagesEnum;

  @IsString()
  locationName: string;

  @IsOptional()
  @IsString()
  locationAddress: string;

  @IsOptional()
  guest: GuestEntity[];

  @Transform(({ value }) => JSON.parse(value), { toClassOnly: true })
  @Type(() => Planner)
  planners: Planner[];

  @IsString()
  image: string;

  constructor(event: EventsDto) {
    super();
    this.id = event.id || uuidv4();
    if (typeof event.planners === "string") {
      this.planners = JSON.parse(event.planners);
    }
    this.type = event.type;
    this.date = event.date;
    this.time = event.time;
    this.package = event.package;
    this.guest = event.guest;
    this.locationAddress = event.locationAddress;
    this.locationName = event.locationName;
    this.image = event.image;
  }
}
