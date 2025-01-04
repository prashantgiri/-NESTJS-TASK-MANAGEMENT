/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { TasksRepository } from './tasks.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './tasks.entity'
import { TaskStatus } from './tasks.enum'
import { GetTasksWithFilters } from './dto/get-tasks-filter.dto'
import { User } from 'src/auth/user.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TasksRepository,
  ) { }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { name, description } = createTaskDto;
    const task = this.taskRepository.create({
        name: name,
        description: description,
        status: TaskStatus.OPEN,
        user
    });
    await this.taskRepository.save(task);
    return task;
  }

  async getTaskById(id: string, user:User): Promise<Task> {
    const found = await this.taskRepository.findOneBy({id,user})
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`)
    }
    return found
  }

  async deleteTaskById(id: string, user : User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user })
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found`)
    }
  }

  async getTasks(filterDto: GetTasksWithFilters, user:User): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({user})

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.name) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      )
    }
    const tasks = await query.getMany()
    return tasks
  }

  async updateTaskStatus(id: string, status: TaskStatus, user:User): Promise<Task> {
    const task = await this.getTaskById(id,user)
    task.status = status
    return this.taskRepository.save(task)
  }
}
