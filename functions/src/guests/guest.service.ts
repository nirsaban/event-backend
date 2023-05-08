import { DBError } from "../common/errors/general.error";
import { GuestDto } from "./guest.dto";
import { GuestEntity } from "./guest.entity";
import { GuestsRepository } from "./guest.repository";

export class GuestsService {
  guestsRepository: GuestsRepository;

  constructor() {
    this.guestsRepository = new GuestsRepository();
  }

  public async create(userId: string, eventId: string, guestDto: GuestDto): Promise<GuestDto> {
    try {
      const guestEntity: GuestEntity = guestDto.toEntity();

      await this.guestsRepository.createOrUpdate(userId, eventId, guestEntity);

      return guestDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async update(userId: string, eventId: string, guestDto: GuestDto): Promise<GuestDto> {
    try {
      const guestEntity: GuestEntity = guestDto.toEntity();

      await this.guestsRepository.createOrUpdate(userId, eventId, guestEntity);

      return guestDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async get(userId: string, eventId: string, guestId: string): Promise<GuestDto> {
    try {
      const guestEntity: GuestEntity = await this.guestsRepository.get(userId, eventId, guestId);

      return { ...guestEntity } as unknown as GuestDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async getAll(userId: string, eventId: string): Promise<GuestDto[]> {
    try {
      const guestEntity: GuestEntity[] = await this.guestsRepository.getAll(userId, eventId);

      return guestEntity.map((guest) => {
        return guest as unknown as GuestDto;
      });
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async delete(userId: string, eventId: string, guestId: string): Promise<void> {
    try {
      await this.guestsRepository.delete(userId, eventId, guestId);
    } catch (error) {
      throw new DBError(error.message);
    }
  }
  public async sort(userId: string, eventId: string, attr: keyof GuestEntity): Promise<any> {
    try {
      const guests: GuestEntity[] = await this.getAll(userId, eventId);

      return guests.reduce(
        (result, item) => ({
          ...result,
          [item[attr]]: [...(result[item[attr]] || []), item],
        }),
        {}
      );
    } catch (error) {
      throw new DBError(error.message);
    }
  }
}
