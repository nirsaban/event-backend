import { DBError } from "../common/errors/general.error";
import { TasksDto } from "./tasks.dto";
import { TasksEntity } from "./tasks.entity";
import { TasksRepository } from "./tasks.repository";

export class TasksService {
  tasksRepository: TasksRepository;

  constructor() {
    this.tasksRepository = new TasksRepository();
  }

  public async create(userId: string, eventId: string, tasksDto: TasksDto): Promise<TasksDto> {
    try {
      const tasksEntity: TasksEntity = tasksDto.toEntity();

      await this.tasksRepository.createOrUpdate(userId, eventId, tasksEntity);

      return tasksDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async update(userId: string, eventId: string, tasksDto: TasksDto): Promise<TasksDto> {
    try {
      const tasksEntity: TasksEntity = tasksDto.toEntity();

      await this.tasksRepository.createOrUpdate(userId, eventId, tasksEntity);

      return tasksDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async get(userId: string, eventId: string, TableId: string): Promise<TasksDto> {
    try {
      const tasksEntity: TasksEntity = await this.tasksRepository.get(userId, eventId, TableId);

      return { ...tasksEntity } as unknown as TasksDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async getAll(userId: string, eventId: string): Promise<TasksDto[]> {
    try {
      const tasksEntity: TasksEntity[] = await this.tasksRepository.getAll(userId, eventId);

      return tasksEntity.map((Table) => {
        return Table as unknown as TasksDto;
      });
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async delete(userId: string, eventId: string, TableId: string): Promise<void> {
    try {
      await this.tasksRepository.delete(userId, eventId, TableId);
    } catch (error) {
      throw new DBError(error.message);
    }
  }
  public async sort(userId: string, eventId: string, attr: keyof TasksEntity): Promise<any> {
    try {
      const tasks: TasksEntity[] = await this.getAll(userId, eventId);

      return tasks.reduce(
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
