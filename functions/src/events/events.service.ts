import { DBError } from "../common/errors/general.error";
import { BucketServiceHelper } from "../common/helpers/bucketService.helper";
import { File } from "../common/interfaces/file.interface";
import { EventsDto } from "./events.dto";
import { EventsEntity } from "./events.entity";
import { EventsRepository } from "./events.repository";

export class EventsService {
  eventsRepository: EventsRepository;
  private bucketService: BucketServiceHelper;
  constructor() {
    this.eventsRepository = new EventsRepository();
    this.bucketService = new BucketServiceHelper();
  }

  public async createEvent(
    userId: string,
    eventDto: EventsDto,
    file: File
  ): Promise<EventsDto> {
    try {
      const eventEntity: EventsEntity = eventDto.toEntity();

      const eventImage: string = await this.bucketService.uploadFile(file);

      eventEntity.image = eventImage;

      await this.eventsRepository.createOrUpdateEvent(userId, eventEntity);

      return { ...eventEntity } as unknown as EventsDto;
    } catch (error) {
      console.log(error);
      throw new DBError(error.message);
    }
  }

  public async updateEvent(
    userId: string,
    eventDto: EventsDto
  ): Promise<EventsDto> {
    try {
      const eventEntity: EventsEntity = eventDto.toEntity();

      await this.eventsRepository.createOrUpdateEvent(userId, eventEntity);

      return eventDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }
  public async get(userId: string, eventId: string): Promise<EventsDto> {
    try {
      const eventEntity: EventsEntity = await this.eventsRepository.get(
        userId,
        eventId
      );

      return { ...eventEntity } as unknown as EventsDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async getAll(userId: string): Promise<EventsDto[]> {
    try {
      const eventEntity: EventsEntity[] = await this.eventsRepository.getAll(
        userId
      );

      return eventEntity.map((event) => {
        return event as unknown as EventsDto;
      });
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async delete(userId: string, eventId: string): Promise<void> {
    try {
      await this.eventsRepository.delete(userId, eventId);
    } catch (error) {
      throw new DBError(error.message);
    }
  }
}
