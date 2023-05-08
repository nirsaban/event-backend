import { BaseRepository } from "../common/base/repository.base";
import { DBError } from "../common/errors/general.error";
import { TasksEntity } from "./tasks.entity";

export class TasksRepository extends BaseRepository<TasksEntity> {
  constructor() {
    super("users");
  }

  public async createOrUpdate(
    userId: string,
    eventId: string,
    tasksEntity: TasksEntity
  ): Promise<TasksEntity> {
    try {
      await this.db
        .doc(userId)
        .collection("events")
        .doc(eventId)
        .collection("tasks")
        .doc(tasksEntity.id)
        .set({ ...tasksEntity }, { merge: true });

      return tasksEntity;
    } catch (error) {
      throw new DBError(error);
    }
  }

  public async get(userId: string, eventId: string, tasksId: string): Promise<TasksEntity> {
    const tasksRef = await this.db
      .doc(userId)
      .collection("events")
      .doc(eventId)
      .collection("tasks")
      .doc(tasksId)
      .get();

    return tasksRef.data() as TasksEntity;
  }

  public async getAll(userId: string, eventId: string): Promise<TasksEntity[]> {
    const tasksRef = await this.db
      .doc(userId)
      .collection("events")
      .doc(eventId)
      .collection("tasks")
      .get();

    const tasksList: TasksEntity[] = [];

    tasksRef.docs.forEach(async (tasks) => {
      tasksList.push(tasks.data() as TasksEntity);
    });

    return tasksList;
  }
  public async delete(userId: string, eventId: string, tasksId: string): Promise<void> {
    await this.db.doc(userId).collection("tasks").doc(tasksId).delete();
  }
}
