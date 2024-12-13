import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.Service';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
