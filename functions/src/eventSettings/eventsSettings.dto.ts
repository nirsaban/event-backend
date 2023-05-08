import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto } from "../common/abstract/dto.abstract";
import { PackagesEnum } from "../common/enums/packages.enum";
import { GuestEntity } from "../guests/guest.entity";
import { EventsSettingsEntity } from "./eventsSettings.entity";
import { v4 as uuidv4 } from "uuid";
import { Transform } from "class-transformer";
import { IsNumberString } from "class-validator-multi-lang";

export class EventsSettingsDto extends BaseDto<
  EventsSettingsDto,
  EventsSettingsEntity
> {
  @IsString()
  id: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumberString()
  guestAmount: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumberString()
  reserve: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumberString()
  tableSits: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumberString()
  knightsTableSits: number;

  constructor(event: EventsSettingsDto) {
    super();
    this.id = event.id || uuidv4();

    this.guestAmount = event.guestAmount;

    this.tableSits = event.tableSits;

    this.reserve = event.reserve;

    this.knightsTableSits = event.knightsTableSits;
  }
}
