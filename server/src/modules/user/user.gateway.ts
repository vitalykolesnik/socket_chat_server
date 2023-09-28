import { UserService } from '@app/modules/user/user.service';
import { JWTSocketGuard } from '@app/guards/jwtSocket.guard';
import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { CustomSocketInterface } from '@app/types/customSocket.interface';
import { Client } from '@app/decorators/client.decorator';

@UseGuards(JWTSocketGuard)
@WebSocketGateway()
export class UserGateway implements OnGatewayDisconnect {
  constructor(private readonly userService: UserService) {}

  async handleDisconnect(@ConnectedSocket() socket: CustomSocketInterface) {
    socket.broadcast.emit('user/disconnect');
  }

  @SubscribeMessage('user/login')
  async login(
    @ConnectedSocket() socket: CustomSocketInterface,
    @Client('id') id: string,
  ) {
    const user = await this.userService.findById(id);
    const updatedUser = await this.userService.updateUser(user.id, {
      email: user.email,
      socketId: socket.id,
    });
    socket.emit('user/login-response', updatedUser);
  }

  @SubscribeMessage('disconnecting')
  async disconnecting(
    @ConnectedSocket() socket: CustomSocketInterface,
    @Client('id') id: string,
  ) {
    const user = await this.userService.findById(id);
    await this.userService.updateUser(user.id, {
      email: user.email,
      socketId: null,
    });
    socket.broadcast.emit('user/disconnect');
  }

  @SubscribeMessage('users/update')
  @SubscribeMessage('users/getAll')
  async getAllUser(@ConnectedSocket() socket: CustomSocketInterface) {
    const { users } = await this.userService.getAllUsers();
    socket.emit('users/update-response', users);
    socket.broadcast.emit('users/update-response', users);
  }
}
