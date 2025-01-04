/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksWithFilters } from './dto/get-tasks-filter.dto'
import { Task } from './tasks.entity'
import { updateTaskDto } from './dto/update-task.dto'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/auth/user.entity'
import { GetUser } from 'src/auth/get-user.decorator'

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController')

  constructor (private taskService: TasksService) {}

  @Get()
  getTasks (
    @Query() filterDto: GetTasksWithFilters,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${user.username} retrieving all tasks with Filter: ${JSON.stringify(
        filterDto,
      )}`,
    )
    return this.taskService.getTasks(filterDto, user)
  }

  @Get('/:id')
  getTaskById (@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user)
  }

  @Post()
  createTask (
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User ${user.username} creating task with Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    )
    return this.taskService.createTask(createTaskDto, user)
  }

  @Delete('/:id')
  deleteTaskById (
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskService.deleteTaskById(id, user)
  }

  @Patch('/:id/status')
  updateTaskStatus (
    @Param('id') id: string,
    @Body() updateTaskDto: updateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskDto
    return this.taskService.updateTaskStatus(id, status, user)
  }
}
