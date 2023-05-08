import { BaseDto } from "../common/abstract/dto.abstract";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { GuestStatusEnum } from "../common/enums/guestStatus.enum";
import { v4 as uuidv4 } from "uuid";
import { GuestEntity } from "../guests/guest.entity";
import { TasksEntity } from "./tasks.entity";
import { GuestDto } from "../guests/guest.dto";
import { EventsEntity } from "../events/events.entity";

export enum TaskStatusEnum {
  process = "process",
  completed = "completed",
  canceled = "canceled",
}

export class TasksDto extends BaseDto<TasksDto, TasksEntity> {
  @IsString()
  id: string;

  @IsString()
  assignTo: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

  @IsNumber()
  deadLine: number;

  constructor(taskDto: TasksDto) {
    super();

    this.id = taskDto.id || uuidv4();

    this.assignTo = taskDto.assignTo;

    this.status = taskDto.status;

    this.description = taskDto.description;

    this.deadLine = taskDto.deadLine;
  }
}
