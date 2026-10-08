import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.ts';

export class Task {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
}

@Injectable()
export class TasksService {

    private tasks: Task[] = [
        { id: '1', title: "Learn NestJS", isCompleted: false },
        { id: '2', title: "Example 2", isCompleted: false },
    ];

    findAll(): Task[] {
        return this.tasks;
    }

    findById(id: string): Task {
        const task = this.tasks.find((t) => t.id === id);
        if (!task) {
            throw new NotFoundException(`Task with ID : "${id}: not found`);
        }
        return task;
    }

    create(createTaskDto: CreateTaskDto): Task {
        const newTask: Task = {
            id: Date.now().toString(),
            title: createTaskDto.title,
            description: createTaskDto.description,
            isCompleted: false,
        }
        this.tasks.push(newTask);
        return newTask;
    }

    delete(id: string): { message: string } {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter((t) => t.id !== id);
        if (this.tasks.length === initialLength) {
            throw new NotFoundException(`Task with ID : "${id}: not found`);
        }
        return { message: `Task with ID: "${id}" deleted successfully.` }
    }

}
