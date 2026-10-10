import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class AdminRoleGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.user || request.user.role !== 'admin') {
            throw new ForbiddenException('Forbidden: Only admin can perform this action');
        }

        return true;
    }
}