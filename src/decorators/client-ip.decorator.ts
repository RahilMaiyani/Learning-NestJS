import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ClientIp = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
        const request = ctx.switchToHttp().getRequest();
        return request.ip || request.socket.remoteAddress || '127.0.0.1';
    },
);