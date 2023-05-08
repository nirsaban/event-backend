import { GuestsCategoryRepository } from "./../guestCategories/guestCategories.respository";
import { DBError } from "./../common/errors/DB.error";
import { BaseRepository } from "./../common/base/repository.base";
import { GuestEntity } from "./guest.entity";
import { v4 as uuidv4 } from "uuid";
export class GuestsRepository extends BaseRepository<GuestEntity> {
  private guestCategory: GuestsCategoryRepository;

  constructor() {
    super("users");
    this.guestCategory = new GuestsCategoryRepository();
  }

  public async createOrUpdate(
    userId: string,
    eventId: string,
    guestEntity: GuestEntity
  ): Promise<GuestEntity> {
    try {
      await this.db
        .doc(userId)
        .collection("events")
        .doc(eventId)
        .collection("guests")
        .doc(guestEntity.id)
        .set({ ...guestEntity }, { merge: true });

      await this.guestCategory.createOrUpdate(userId, eventId, {
        name: guestEntity.category,
        id: `${guestEntity.category.replace(/\s/g, "_")}`,
      });

      return guestEntity;
    } catch (error) {
      throw new DBError(error, error.message);
    }
  }

  public async get(userId: string, eventId: string, guestId: string): Promise<GuestEntity> {
    const guestRef = await this.db
      .doc(userId)
      .collection("events")
      .doc(eventId)
      .collection("guests")
      .doc(guestId)
      .get();

    return guestRef.data() as GuestEntity;
  }

  public async getAll(userId: string, eventId: string): Promise<GuestEntity[]> {
    const guestRef = await this.db
      .doc(userId)
      .collection("events")
      .doc(eventId)
      .collection("guests")
      .get();

    const guestList: GuestEntity[] = [];

    guestRef.docs.forEach(async (guest) => {
      guestList.push(guest.data() as GuestEntity);
    });

    return guestList;
  }
  public async delete(userId: string, eventId: string, guestId: string): Promise<void> {
    await this.db.doc(userId).collection("guests").doc(guestId).delete();
  }
}
