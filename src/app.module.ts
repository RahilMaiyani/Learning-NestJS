import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';
import { TasksModule } from './tasks/tasks.module.ts';
import { ConfigModule } from '@nestjs/config';
import { RequestIdMiddleware } from './middlewares/request-id.middleware.ts';
import { PrismaModule } from './prisma/prisma.module.ts';
import { AuthModule } from './auth/auth.module.js';
import { AdminModule } from './admin/admin.module.js';
import { minutes, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TasksModule,
    AuthModule,
    AdminModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: minutes(10),
          limit: 200
        }
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
