import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.Service';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async searchUser(searchString: string) {
    return this.prisma.user.findFirst({ where: { username: searchString } });
  }

  async updateUser(updateUserDTO: UpdateUserDTO) {
    const { id, avatar } = updateUserDTO;
    return this.prisma.user.update({
      where: { id },
      data: {
        avatar,
      },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
