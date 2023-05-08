import { DBError } from "./../common/errors/general.error";
import { GuestsCategoryEntity } from "./guestCategories.entity";
import { GuestsCategoryRepository } from "./guestCategories.respository";

export class GuestsCategoryService {
  guestsCategoryRepository: GuestsCategoryRepository;
  constructor() {
    this.guestsCategoryRepository = new GuestsCategoryRepository();
  }

  public async getAll(userId: string, eventId: string): Promise<GuestsCategoryEntity[]> {
    try {
      return await this.guestsCategoryRepository.getAll(userId, eventId);
    } catch (error) {
      throw new DBError(error.message);
    }
  }
}
