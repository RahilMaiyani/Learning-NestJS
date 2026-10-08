import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Task, TasksService } from './tasks.service.ts';
import { CreateTaskDto } from './dto/create-task.dto.ts';

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.findAll();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.findById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.create(createTaskDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    deleteTask(@Param('id') id: string) {
        return this.tasksService.delete(id);
    }

}
