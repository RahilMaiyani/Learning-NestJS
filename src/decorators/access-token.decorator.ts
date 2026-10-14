import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

export const GetAccessToken = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
        const request: Request = ctx.switchToHttp().getRequest();
        // console.log(request.headers)
        const accessToken = request.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            throw new UnauthorizedException("Missing authorization token")
        }

        return accessToken;
    }
);