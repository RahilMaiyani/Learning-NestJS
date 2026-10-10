import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service.ts';
import { CreateTaskDto } from './dto/create-task.dto.ts';
import { UpdateTaskDto } from './dto/update-task-dto.ts';
import { ApiKeyGuard } from '../guards/api-key.guard.ts';
import { ClientIp } from '../decorators/client-ip.decorator.ts';
import { Task } from '../generated/prisma/browser.ts';
import { JwtAuthGuard } from '../guards/jwt-auth.guard.ts';
import { AuthenticatedUser, CurrentUser } from '../decorators/current-user.decorator.ts';
import { PaginatedTasksDto } from './dto/paginated-tasks.dto.ts';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {

    constructor(private readonly tasksService: TasksService) { }

    @Get()
    getAllTasks(@ClientIp() ip: string, @CurrentUser() user: AuthenticatedUser): Promise<Task[]> {
        console.log(`[TasksController] User ${user.email} from IP ${ip}`);
        return this.tasksService.findAll(user.sub);
    }

    @Get(':id')
    getTaskById(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<Task> {
        return this.tasksService.findById(id, user.sub);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: AuthenticatedUser): Promise<Task> {
        return this.tasksService.create(createTaskDto, user.sub);
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @CurrentUser() user: AuthenticatedUser): Promise<Task> {
        return this.tasksService.update(id, updateTaskDto, user.sub);
    }

    @Delete(':id')
    @UseGuards(ApiKeyGuard)
    @HttpCode(HttpStatus.OK)
    deleteTask(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
        return this.tasksService.delete(id, user.sub);
    }

    @Get('paginated/tasks')
    getPaginatedTasks(@Query() paginatedTaskDto: PaginatedTasksDto, @CurrentUser() user: AuthenticatedUser) {
        return this.tasksService.getPaginatedTasks(user.sub, paginatedTaskDto);
    }

}
