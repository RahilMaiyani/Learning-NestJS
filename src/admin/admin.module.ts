import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller.js';
import { AdminService } from './admin.service.js';
import { TasksService } from '../tasks/tasks.service.ts';

@Module({
  controllers: [AdminController],
  providers: [AdminService, TasksService]
})
export class AdminModule { }
