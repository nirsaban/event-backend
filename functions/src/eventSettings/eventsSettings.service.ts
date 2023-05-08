import { DBError } from "../common/errors/general.error";
import { EventsSettingsDto } from "./eventsSettings.dto";
import { EventsSettingsEntity } from "./eventsSettings.entity";
import { EventsSettingsRepository } from "./eventsSettings.repository";

export class EventsSettingsService {
  eventsSettingsRepository: EventsSettingsRepository;

  constructor() {
    this.eventsSettingsRepository = new EventsSettingsRepository();
  }

  public async create(
    userId: string,
    eventId: string,
    eventDto: EventsSettingsDto
  ): Promise<EventsSettingsDto> {
    try {
      const eventEntity: EventsSettingsEntity = eventDto.toEntity();

      await this.eventsSettingsRepository.createOrUpdateEvent(userId, eventId, eventEntity);

      return eventDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async update(
    userId: string,
    eventId: string,
    eventDto: EventsSettingsDto
  ): Promise<EventsSettingsDto> {
    try {
      const eventEntity: EventsSettingsEntity = eventDto.toEntity();

      await this.eventsSettingsRepository.createOrUpdateEvent(userId, eventId, eventEntity);

      return eventDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }
  public async get(userId: string, eventId: string, id: string): Promise<EventsSettingsDto> {
    try {
      const eventEntity: EventsSettingsEntity = await this.eventsSettingsRepository.get(
        userId,
        eventId,
        id
      );

      return { ...eventEntity } as unknown as EventsSettingsDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async getAll(userId: string, eventId: string): Promise<EventsSettingsDto[]> {
    try {
      const eventEntity: EventsSettingsEntity[] = await this.eventsSettingsRepository.getAll(
        userId,
        eventId
      );

      return eventEntity.map((event) => {
        return event as unknown as EventsSettingsDto;
      });
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async delete(userId: string, eventId: string, id: string): Promise<void> {
    try {
      await this.eventsSettingsRepository.delete(userId, eventId, id);
    } catch (error) {
      throw new DBError(error.message);
    }
  }
}
