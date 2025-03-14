import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server } from 'socket.io';
import { OnModuleInit, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@WebSocketGateway({
  cors: {
    origin: true, // Allow this origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class MessageGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  private projectMembers: { [projectId: string]: string[] } = {};

  constructor(private readonly messageService: MessageService) {}

  onModuleInit() {
    this.server.on('connect', (socket) => {
      const userId = socket.handshake.query.userId;
      console.log('connected');

      if (userId) {
        this.messageService.updateUserStatus(Number(userId), true);
      }

      socket.on('disconnect', async () => {
        if (userId) {
          await this.messageService.updateUserStatus(Number(userId), false);
        }
      });
    });
  }

  @SubscribeMessage('joinChat')
  handleJoinProject(
    @MessageBody() { projectId, userId }: { projectId: string; userId: string },
  ) {
    this.server.socketsJoin(projectId);
    if (!this.projectMembers[projectId]) {
      this.projectMembers[projectId] = [];
    }
    this.projectMembers[projectId].push(userId);
  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);
    this.server.in(message.projectId.toString()).emit('onMessage', message);
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messageService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  async update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    const message = await this.messageService.update(updateMessageDto);
    this.server.emit('onUpdate', { message });
  }

  @SubscribeMessage('removeMessage')
  async remove(@MessageBody() id: number) {
    const message = await this.messageService.remove(id);
    this.server.emit('onRemove', { messsageId: message.id });
  }
}
