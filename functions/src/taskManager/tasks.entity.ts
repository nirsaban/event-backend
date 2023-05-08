import { TaskStatusEnum } from "./tasks.dto";

export class TasksEntity {
  id: string;

  assignTo: string;

  description: string;

  status: TaskStatusEnum;

  deadLine: number;
}
