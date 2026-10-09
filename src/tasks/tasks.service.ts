import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.ts';
import { UpdateTaskDto } from './dto/update-task-dto.ts';
import { PrismaService } from '../prisma/prisma.service.ts';
import { Task } from '../generated/prisma/browser.ts';

@Injectable()
export class TasksService {

    constructor(private readonly prisma: PrismaService) { }

    // private tasks: Task[] = [
    //     { id: '1', title: "Learn NestJS", isCompleted: false },
    //     { id: '2', title: "Example 2", isCompleted: false },
    // ];

    async findAll(userId: string): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string, userId: string): Promise<Task> {
        const task = await this.prisma.task.findUnique({ where: { id, userId } });
        if (!task) {
            throw new NotFoundException(`Task with ID : "${id}: not found`);
        }
        return task;
    }

    async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        return this.prisma.task.create({
            data: {
                title: createTaskDto.title,
                description: createTaskDto.description,
                userId,
            }
        })
    }

    async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
        await this.findById(id, userId);

        return this.prisma.task.update({
            where: { id },
            data: updateTaskDto,
        });
    }

    async delete(id: string, userId: string): Promise<{ message: string }> {
        await this.findById(id, userId);

        await this.prisma.task.delete({
            where: { id },
        });
        return { message: `Task with ID: "${id}" deleted successfully.` }
    }
}
