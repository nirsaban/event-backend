import { GuestEntity } from "./guest.entity";
import { BaseDto } from "../common/abstract/dto.abstract";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { GuestStatusEnum } from "../common/enums/guestStatus.enum";
import { v4 as uuidv4 } from "uuid";

export class GuestDto extends BaseDto<GuestDto, GuestEntity> {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsNumber()
  tableNumber: number;

  @IsOptional()
  @IsString()
  present: string;

  @IsEnum(GuestStatusEnum)
  status: GuestStatusEnum;
  constructor(guest: GuestDto) {
    super();

    this.id = guest.id || guest.phoneNumber;

    this.name = guest.name;

    this.phoneNumber = guest.phoneNumber;

    this.category = guest.category;

    this.amount = guest.amount;

    this.tableNumber = guest.tableNumber;

    this.status = guest.status || GuestStatusEnum.pending;
  }
}
