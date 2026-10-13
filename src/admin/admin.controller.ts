import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service.ts';
import { JwtAuthGuard } from '../guards/jwt-auth.guard.ts';
import { AdminRoleGuard } from '../guards/admin-role.guard.ts';
import { PaginatedTasksDto } from '../tasks/dto/paginated-tasks.dto.ts';
import { PaginatedUserDto } from './dto/paginated-user.dto.ts';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminRoleGuard)
export class AdminController {

    constructor(private readonly adminService: AdminService) { }

    @Post("delete/:id")
    deleteUser(@Param('id') id: string) {
        return this.adminService.deleteUser(id);
    }

    @Get("all")
    getAllUsers() {
        return this.adminService.getAllUsers();
    }

    @Patch("update-role/:id")
    updateUserRole(@Param('id') id: string, @Body('role') role: string) {
        return this.adminService.updateUserRole(id, role);
    }

    @Get('user/:id/tasks')
    getUserTasks(@Param('id') id: string) {
        return this.adminService.getUserTasks(id);
    }

    @Get('tasks/paginated')
    getPaginatedTasks(@Query() paginatedTaskDto: PaginatedTasksDto, @Body('userId') userId: string | undefined) {
        return this.adminService.getPaginatedTasks(paginatedTaskDto, userId);
    }

    @Delete('tasks/:id')
    deleteTask(@Param('id') taskId: string) {
        return this.adminService.deleteTask(taskId);
    }

    @Get('paginated/users')
    getPaginatedUsers(@Query() paginatedUserDto: PaginatedUserDto) {
        return this.adminService.getPaginatedUsers(paginatedUserDto);
    }

}
