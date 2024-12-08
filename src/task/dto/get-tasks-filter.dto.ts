/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../tasks.enum";

export class GetTasksWithFilters {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
    
    @IsOptional()
    @IsString()
    search?: string;
}   