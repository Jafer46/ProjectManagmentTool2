import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/gurads/auth.guard';
import { Request } from 'express';
import { UpdateUserDTO } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/file/disk.options';

// @UseGuards(AuthGuard)
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
    const searchString = req.query.query.toString();
    console.log(searchString);
    return this.userService.searchUser(searchString);
  }

  @Put('id')
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async changeProfilePic(
    @Req() req: Request,
    @Body() body: UpdateUserDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = Number(req.user);
    if (userId == body.id) {
      throw new UnauthorizedException('User is not authorized');
    }

    return this.userService.updateUser({
      fileName: file.originalname,
      filePath: file.filename,
      userId,
    });
  }
}
