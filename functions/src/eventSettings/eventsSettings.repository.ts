import { DBError } from "../common/errors/DB.error";
import e from "express";
import { BaseRepository } from "../common/base/repository.base";
import { EventsSettingsEntity } from "./eventsSettings.entity";

export class EventsSettingsRepository extends BaseRepository<EventsSettingsEntity> {
  constructor() {
    super("users");
  }

  public async createOrUpdateEvent(
    userId: string,
    eventId: string,
    eventEntity: EventsSettingsEntity
  ): Promise<EventsSettingsEntity> {
    try {
      await this.db
        .doc(userId)
        .collection("events")
        .doc(eventId)
        .collection("eventsSettings")
        .doc(eventEntity.id)
        .set({ ...eventEntity }, { merge: true });

      return eventEntity;
    } catch (error) {
      throw new DBError(error, error.message);
    }
  }

  public async get(userId: string, eventId: string, id: string): Promise<EventsSettingsEntity> {
    const eventRef = await this.db
      .doc(userId)
      .collection("events")
      .doc(eventId)
      .collection("eventsSettings")
      .doc(id)
      .get();

    return eventRef.data() as EventsSettingsEntity;
  }

  public async getAll(userId: string, eventId: string): Promise<EventsSettingsEntity[]> {
    const eventRef = await this.db
      .doc(userId)
      .collection("events")
      .doc(eventId)
      .collection("eventsSettings")
      .get();

    const eventList: EventsSettingsEntity[] = [];

    eventRef.docs.forEach(async (event) => {
      eventList.push(event.data() as EventsSettingsEntity);
    });

    return eventList;
  }
  public async delete(userId: string, eventId: string, id: string): Promise<void> {
    await this.db
      .doc(userId)
      .collection("events")
      .doc(eventId)
      .collection("eventsSettings")
      .doc(eventId)
      .delete();
  }
}
