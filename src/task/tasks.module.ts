/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksController } from '../task/tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TaskModule {}
