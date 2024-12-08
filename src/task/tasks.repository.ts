/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";
import { Task } from "./tasks.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks.enum";

export class TasksRepository extends Repository<Task> {

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { name, description } = createTaskDto;
        const task = this.create({
            name: name,
            description: description,
            status: TaskStatus.OPEN,
        });
        await this.save(task);
        return task;
    }
}