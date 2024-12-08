/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskModule } from './task/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TaskModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password:'Prashant@123',
    database : 'nestjs-task-management',
    autoLoadEntities: true,
    synchronize: true
  }), AuthModule],
})
export class AppModule {}
