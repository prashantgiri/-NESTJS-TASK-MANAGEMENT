/* eslint-disable prettier/prettier */
import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks.enum";

export class updateTaskDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}