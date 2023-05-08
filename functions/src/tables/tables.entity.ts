import { GuestDto } from "../guests/guest.dto";
import { TableTypeEnum } from "./tables.dto";

export class TablesEntity {
  id: string;

  number: number;

  type: TableTypeEnum;

  category: string;

  guests: GuestDto[];

  isFull: boolean;
}
