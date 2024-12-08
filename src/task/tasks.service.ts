/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.enum';
import { GetTasksWithFilters } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: TasksRepository
  ) { }


  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
  }

 async getTasks(filterDto: GetTasksWithFilters): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
        query.andWhere('task.status = :status', { status });
    }

    if (search) {
        query.andWhere(
            'LOWER(task.name) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
            { search: `%${search}%` },
        );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    return this.taskRepository.save(task);
  }

}
