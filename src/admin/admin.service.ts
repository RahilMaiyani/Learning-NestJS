import { Injectable, NotFoundException } from '@nestjs/common';
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
}
