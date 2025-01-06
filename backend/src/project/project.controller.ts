import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/common/user.Service';
import { AuthGuard } from 'src/gurads/auth.guard';
import { ProjectService } from './project.service';

@UseGuards(AuthGuard)
@Controller('project')
export class ProjectController {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  @Get()
  async getProjects(@Req() req) {
    const userId = req.user;
    const user = await this.userService.getUser({ id: userId });
    return user?.projects ?? [];
  }

  @Get('id')
  async getProject(@Req() req: Request, @Param('id') id) {
    const userId = req.user;
    const projectId = req.params.id;
    if (!projectId || !userId) {
      throw new BadRequestException();
    }
    return await this.projectService.getProject(Number(id));
  }

  @Post()
  async createProject(@Req() req, @Body() body) {
    const {} = body;
  }

  @Put('id')
  async updateProject(@Body() body, @Req() req, @Param('id') id) {
    const userId = Number(req.user);
    const projectId = Number(id);
    const isAdmin = await this.projectService.isAdmin(userId, projectId);
    if (!isAdmin) {
      throw new UnauthorizedException('User is not authorized');
    }

    const { title, description, priority, status } = body;
    const data = {
      title,
      description,
      priority,
      status,
    };
    return this.projectService.updateProject(id, data);
  }

  @Put('id/adduser')
  async addUserToProject(@Body() Body, @Req() req, @Param('id') id) {
    const userId = Number(req.user);
    const projectId = Number(id);
    const isAdmin = await this.projectService.isAdmin(userId, projectId);
    if (!isAdmin) {
      throw new UnauthorizedException('User is not authorized');
    }
    // const data = {
    //   users {
    //     connect:
    //   }:
    // }
  }

  @Delete('id')
  async deleteProject(@Param('id') id, @Req() req) {
    const userId = Number(req.user);
    const projectId = Number(id);
    const isAdmin = await this.projectService.isAdmin(userId, projectId);
    if (!isAdmin) {
      throw new UnauthorizedException('User is not authorized');
    }

    return this.projectService.delete(projectId);
  }
}
