import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.ts';

@Injectable()
export class AdminService {

    constructor(private readonly prismaService: PrismaService) { }

    async deleteUser(id: string) {
        const existing = await this.prismaService.user.findUnique({
            where: { id }
        });

        if (!existing) {
            throw new NotFoundException(`User with ID: ${id} not found.`);
        }

        await this.prismaService.user.delete({
            where: { id }
        });

        return {
            message: `Successfully deleted user with ID: ${id}`
        }
    }

    async getAllUsers() {
        const users = await this.prismaService.user.findMany({
            select: { id: true, email: true, name: true, role: true, createdAt: true, updatedAt: true },
            orderBy: { updatedAt: 'desc' }
        });

        return {
            message: "Users fetched successfully",
            users: users.length === 0 ? [] : users,
        }
    }

    async updateUserRole(id: string, role: string) {

        if (!['admin', 'user'].includes(role)) {
            throw new BadRequestException("Invalid role value")
        }

        const existing = await this.prismaService.user.findUnique({
            where: { id }
        });

        if (!existing) {
            throw new NotFoundException(`User with ID: ${id} not found.`);
        }

        const updatedUser = await this.prismaService.user.update({
            where: { id },
            data: { role },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });

        return {
            messsage: "Roles updated successfully",
            updatedUser
        }
    }

    async getUserTasks(userId: string) {
        const existing = await this.prismaService.user.findUnique({
            where: { id: userId }
        });

        if (!existing) {
            throw new NotFoundException(`User with ID: ${userId} not found.`);
        }

        const tasks = await this.prismaService.task.findMany({
            where: { userId }
        });

        const completedTasks = tasks.filter((t) => t.isCompleted === true);

        return {
            messsage: `Tasks fetched successfully for the user: ${existing.email}`,
            totalTasks: tasks.length,
            totalCompletedTasks: completedTasks.length,
            tasks,
        }
    }

}
