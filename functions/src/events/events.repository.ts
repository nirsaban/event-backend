import { DBError } from "./../common/errors/DB.error";
import e from "express";
import { BaseRepository } from "./../common/base/repository.base";
import { EventsEntity } from "./events.entity";

export class EventsRepository extends BaseRepository<EventsEntity> {
  constructor() {
    super("users");
  }

  public async createOrUpdateEvent(
    userId: string,
    eventEntity: EventsEntity
  ): Promise<EventsEntity> {
    try {
      await this.db
        .doc(userId)
        .collection("events")
        .doc(eventEntity.id)
        .set({ ...eventEntity }, { merge: true });

      return eventEntity;
    } catch (error) {
      throw new DBError(error, error.message);
    }
  }

  public async get(userId: string, eventId: string): Promise<EventsEntity> {
    const eventRef = this.db.doc(userId).collection("events").doc(eventId);

    const eventData = (await eventRef.get()).data() as EventsEntity;

    let subCollections = await eventRef.listCollections();

    // Retrieve all the documents in each subcollection
    for (let subCollection of subCollections) {
      let subCollectionDocs = await subCollection.get();
      for (let doc of subCollectionDocs.docs) {
        eventData[subCollection.id] = [...(eventData[subCollection.id] || []), doc.data()];
      }
    }

    return eventData;
  }

  public async getAll(userId: string): Promise<EventsEntity[]> {
    const eventRef = await this.db.doc(userId).collection("events").get();

    const eventList: EventsEntity[] = [];

    eventRef.docs.forEach(async (event) => {
      eventList.push(event.data() as EventsEntity);
    });

    return eventList;
  }
  public async delete(userId: string, eventId: string): Promise<void> {
    await this.db.doc(userId).collection("events").doc(eventId).delete();
  }
}
