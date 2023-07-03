import { OnModuleInit, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from 'src/core/guards/ws-jwt.guard';
import { SocketAuthMiddleware } from 'src/core/middleware/ws.middleware';

@WebSocketGateway()
@UseGuards(WsJwtGuard)
export class UserGateway implements OnModuleInit {
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
}
