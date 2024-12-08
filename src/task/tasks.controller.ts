/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksWithFilters } from './dto/get-tasks-filter.dto';
import { Task } from './tasks.entity';
import { updateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {

  constructor(private taskService: TasksService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksWithFilters): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
     return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() updateTaskDto: updateTaskDto): Promise<Task> {
    const { status } = updateTaskDto;
    return this.taskService.updateTaskStatus(id, status)
  }
}
