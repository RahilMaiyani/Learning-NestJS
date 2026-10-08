import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller.ts';
import { TasksService } from './tasks.service.ts';

@Module({
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
