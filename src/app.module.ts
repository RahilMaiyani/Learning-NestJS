import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';
import { TasksModule } from './tasks/tasks.module.ts';
import { ConfigModule } from '@nestjs/config';
import { RequestIdMiddleware } from './middlewares/request-id.middleware.ts';

@Module({
  imports:
    [ConfigModule.forRoot({ isGlobal: true }),
      TasksModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
