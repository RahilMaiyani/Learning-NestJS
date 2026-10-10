import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service.ts';
import { JwtAuthGuard } from '../guards/jwt-auth.guard.ts';
import { AdminRoleGuard } from '../guards/admin-role.guard.ts';

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

}
