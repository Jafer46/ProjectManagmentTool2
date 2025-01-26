import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
