import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log(`[PerformanceInterceptor] Before...`)
        const now = Date.now();
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;

        return next.handle().pipe(
            tap(() => {
                console.log(`[PerformanceInterceptor] After [${method}] ${url} ${Date.now() - now}ms`)
            })
        );
    }
}