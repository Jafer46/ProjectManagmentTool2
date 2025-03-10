import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/common/prisma.Service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
