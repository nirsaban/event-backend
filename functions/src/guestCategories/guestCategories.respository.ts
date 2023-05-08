import { BaseRepository } from "../common/base/repository.base";
import { DBError } from "../common/errors/general.error";
import { GuestEntity } from "../guests/guest.entity";
import { GuestsCategoryEntity } from "./guestCategories.entity";

export class GuestsCategoryRepository extends BaseRepository<GuestsCategoryEntity> {
  constructor() {
    super("users");
  }

  public async getAll(userId: string, eventId: string): Promise<GuestsCategoryEntity[]> {
    const guestRef = await this.db
      .doc(userId)
      .collection("events")
      .doc(eventId)
      .collection("guestsCategory")
      .get();

    const guestList: GuestsCategoryEntity[] = [];

    guestRef.docs.forEach(async (guest) => {
      guestList.push(guest.data() as GuestsCategoryEntity);
    });

    return guestList;
  }

  public async createOrUpdate(
    userId: string,
    eventId: string,
    guestsCategoryEntity: GuestsCategoryEntity
  ): Promise<GuestsCategoryEntity> {
    try {
      await this.db
        .doc(userId)
        .collection("events")
        .doc(eventId)
        .collection("guestsCategory")
        .doc(guestsCategoryEntity.id)
        .set({ ...guestsCategoryEntity }, { merge: true });

      return guestsCategoryEntity;
    } catch (error) {
      throw new DBError(error);
    }
  }
}
