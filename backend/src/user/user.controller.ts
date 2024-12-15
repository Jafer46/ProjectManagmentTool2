import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/gurads/auth.guard';
import { Request } from 'express';
import { UpdateUserDTO } from './dto/update-user.dto';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('id')
  async getUser(@Req() req: Request) {
    const userId = Number(req.user);
    const user = await this.userService.getUser(userId);
    if (!user) {
      throw new NotFoundException('Uesr not found!');
    }

    return user;
  }

  @Get('/search')
  async searchUser(@Req() req: Request) {
    const searchString = req.query.toString();
    return this.userService.searchUser(searchString);
  }

  @Put('id')
  async changeProfilePic(@Req() req: Request, @Body() body: UpdateUserDTO) {
    const userId = Number(req.user);
    if (userId == body.id) {
      throw new UnauthorizedException('User is not authorized');
    }
    return this.userService.updateUser(body);
  }
}
