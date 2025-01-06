import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/common/prisma.Service';
import { Message, Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    const { content, userId, projectId } = createMessageDto;

    const data: Prisma.MessageCreateInput = {
      content,
      user: {
        connect: { id: userId },
      },
      project: {
        connect: { id: projectId },
      },
    };
    return this.prisma.message.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.message.findMany();
  }

  async findOne(id: number) {
    return this.prisma.message.findUnique({ where: { id } });
  }

  async update(updateMessageDto: UpdateMessageDto) {
    const { id, content } = updateMessageDto;
    return this.prisma.message.update({
      where: { id },
      data: {
        content,
      },
    });
  }
  async updateUserStatus(userId: number, status: boolean) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        isOnline: status,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.message.delete({ where: { id } });
  }
}
