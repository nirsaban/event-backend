import { BaseRepository } from "../common/base/repository.base";
import { DBError } from "../common/errors/general.error";
import { TablesEntity } from "./tables.entity";

export class TablesRepository extends BaseRepository<TablesEntity> {
  constructor() {
    super("users");
  }

  public async createOrUpdate(
    userId: string,
    eventId: string,
    tablesEntity: TablesEntity
  ): Promise<TablesEntity> {
    try {
      await this.db
        .doc(userId)
        .collection("events")
        .doc(eventId)
        .collection("tables")
        .doc(tablesEntity.id)
        .set({ ...tablesEntity }, { merge: true });

      return tablesEntity;
    } catch (error) {
      throw new DBError(error);
    }
  }

  public async get(userId: string, eventId: string, TablesId: string): Promise<TablesEntity> {
    const tablesRef = await this.db
      .doc(userId)
      .collection("events")
      .doc(eventId)
      .collection("tables")
      .doc(TablesId)
      .get();

    return tablesRef.data() as TablesEntity;
  }

  public async getAll(userId: string, eventId: string): Promise<TablesEntity[]> {
    const tablesRef = await this.db
      .doc(userId)
      .collection("events")
      .doc(eventId)
      .collection("tables")
      .get();

    const tablesList: TablesEntity[] = [];

    tablesRef.docs.forEach(async (Tables) => {
      tablesList.push(Tables.data() as TablesEntity);
    });

    return tablesList;
  }
  public async delete(userId: string, eventId: string, TablesId: string): Promise<void> {
    await this.db.doc(userId).collection("tables").doc(TablesId).delete();
  }
}
