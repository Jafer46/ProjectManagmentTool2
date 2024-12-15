import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UserService } from 'src/common/user.Service';
import { AuthGuard } from 'src/gurads/auth.guard';
import { Request } from 'express';
import { TaskUpdateDTO } from './dto/taskupdate.dto';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskServices: TaskService) {}

  @Get()
  async getTasks(@Req() req: Request) {
    const userId = Number(req.user);
    this.taskServices.getTasks({ where: { userId } });
  }

  @Put('id')
  async updateTask(@Req() req: Request, @Body() body: TaskUpdateDTO) {
    const { completed, description, id, title, userId } = body;
    const cuserId = Number(req.user);
    const isAdmin = await this.taskServices.isAdmin({
      taskId: id,
      userId: cuserId,
    });

    if (isAdmin) {
      const data = body;
      return this.taskServices.updateTask({ id, data });
    } else if (userId == cuserId) {
    } else {
      throw new UnauthorizedException('User is not Authorized');
    }
  }

  @Delete('id')
  async deleteTask(@Req() req: Request, @Param('id') id: string) {
    const userId = Number(req.user);
    const taskId = Number(id);
    const isAdmin = await this.taskServices.isAdmin({ userId, taskId });
    if (!isAdmin) {
      throw new UnauthorizedException('User is not authorized!');
    }
    return this.taskServices.delete({ taskId });
  }
}
