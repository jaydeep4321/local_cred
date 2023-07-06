import { OnModuleInit, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from 'src/core/guards/ws-jwt.guard';
import { SocketAuthMiddleware } from 'src/core/middleware/ws.middleware';
import { UsersService } from './users.service';

@WebSocketGateway()
@UseGuards(WsJwtGuard)
export class UserGateway implements OnModuleInit {
  constructor(private userService: UsersService) {}
  @WebSocketServer()
  server: Server;

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
    console.log('afterinit');
  }

  // handleConnection(client: Socket) {
  //   client.handshake.headers.authorization;
  // }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  // @UseGuards(AuthGuard('jwt'))
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    console.log(payload);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: payload,
    });
  }

  //setTime out function
  doSetTimeout(i) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  }

  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody() payload: number,
    @ConnectedSocket() client: Socket,
  ) {
    // return 'joined';
    this.server.emit('joined', `you are joined with ${client.id} id`);
    const users = await this.userService.findAll();
    console.log('All the users =====>', users);

    // for (let user in users) {
    //   console.log('user ==>', users[user]);
    // }

    // console.log(payload);

    // for (let i = 0; i <= payload; ++i) {
    //   this.doSetTimeout(i);
    // }

    let counter = payload;
    const WinnerCountdown = setInterval(() => {
      this.server.emit('counter', counter);
      counter--;

      if (counter === 0) {
        this.server.emit('users', users);
        this.server.emit('counter', 'All user has been listed!!');
        clearInterval(WinnerCountdown);
      }
    }, 1000);

    // return payload;
  }

  @SubscribeMessage('createRoom')
  createRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    console.log('data ===>', data);
    client.join(data);
  }

  // @SubscribeMessage('fileupload')
  // fileUpload(@)
  // createRoom(socket: Socket, data: string): WsResponse<unknown> {
  //   socket.join('createRoom');
  //   socket.to('createRoom').emit('roomCreated', { room: 'aRoom' });
  //   return { event: 'roomCreated', room: 'createRoom' };
  // }

  // handleConnection(client: Socket, room: string): any {
  //   client.on('room', function (room) {
  //     client.join(room);
  //   });
  // }

  // @SubscribeMessage('message')
  // setQuestion(data: {}): any {
  //   this.server.in(data.room).emit('message', {
  //     question: 'What do you know about Willam Shakespear?',
  //   });
  // }
}
