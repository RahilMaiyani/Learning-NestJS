import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Task, TasksService } from './tasks.service.ts';
import { CreateTaskDto } from './dto/create-task.dto.ts';
import { UpdateTaskDto } from './dto/update-task-dto.ts';
import { ApiKeyGuard } from '../guards/api-key.guard.ts';
import { ClientIp } from '../decorators/client-ip.decorator.ts';

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService) { }

    @Get()
    getAllTasks(@ClientIp() ip: string): Task[] {
        console.log(`[TasksController] Request recived from IP: ${ip}`);
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

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    @UseGuards(ApiKeyGuard)
    @HttpCode(HttpStatus.OK)
    deleteTask(@Param('id') id: string) {
        return this.tasksService.delete(id);
    }

}
