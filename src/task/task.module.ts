/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksController } from '../task/tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TaskModule {}
