import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        const VALID_API_KEY = 'super-secret-key';

        if (!apiKey || apiKey !== VALID_API_KEY) {
            throw new UnauthorizedException(`Invalid or missing API key`);
        }

        return true;
    }
}