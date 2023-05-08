import { EventsRepository } from "./../events/events.repository";
import { BaseRepository } from "../common/base/repository.base";
import { DBError } from "../common/errors/general.error";
import { UsersEntity } from "./users.entity";

export class UsersRepository extends BaseRepository<UsersEntity> {
  constructor() {
    super("users");
  }

  public async getUserByFBID(fbUid: string): Promise<UsersEntity> {
    const userRef = this.db.doc(fbUid);

    const user = await userRef.get();

    if (!user.exists) {
      return null;
    }

    const userData = user.data();

    let subCollections = await userRef.listCollections();

    // Retrieve all the documents in each subcollection
    for (let subCollection of subCollections) {
      let subCollectionDocs = await subCollection.get();
      for (let doc of subCollectionDocs.docs) {
        const event = await new EventsRepository().get(fbUid, doc.data().id);
        userData[subCollection.id] = [...(userData[subCollection.id] || []), event];
      }
    }

    return userData;
  }

  public async updateUser(entity: UsersEntity, id: string): Promise<UsersEntity> {
    try {
      const updatesNested = {};

      for (let update in entity) {
        if (
          typeof entity[update] === "object" &&
          entity[update] !== null &&
          !Array.isArray(entity[update])
        ) {
          for (let field in entity[update]) {
            if (
              entity[update][field] !== null &&
              !Array.isArray(entity[update][field]) &&
              typeof entity[update][field] === "object"
            ) {
              for (let prop in entity[update][field]) {
                updatesNested[`${update}.${field}.${prop}`] = entity[update][field][prop];
              }
            } else {
              updatesNested[`${update}.${field}`] = entity[update][field];
            }
          }
        } else {
          updatesNested[update] = entity[update];
        }
      }

      const result = await this.db.doc(id).update(updatesNested);

      return entity;
    } catch (err) {
      throw new DBError(err.message);
    }
  }

  public async createUser(entity: UsersEntity): Promise<UsersEntity> {
    try {
      const result = await this.db.doc(entity.id).set({ ...entity });

      return entity;
    } catch (error) {
      throw new DBError(error.message);
    }
  }
}
