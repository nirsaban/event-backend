import { BaseEntity } from "../common/abstract/entity.abstract";
import { GuestStatusEnum } from "../common/enums/guestStatus.enum";

export class GuestEntity extends BaseEntity {
  id: string;
  name: string;
  phoneNumber: string;
  status: GuestStatusEnum;
  amount: number;
  category: string;
}
