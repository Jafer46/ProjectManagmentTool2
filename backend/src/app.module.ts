import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [config] }),
    AuthModule,
    CommonModule,
    ProjectModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({ secret: config.get('jwt.secrete') }),
      global: true,
      inject: [ConfigService],
    }),
    TaskModule,
    MessageModule,
    UserModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
