import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseDto } from 'src/utils/response.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async finAll(@Res() res) {
    const users = await this.userService.findAll();
    return new ResponseDto().sendSuccess('success', users, res);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getOne(@Param('id') id: string, @Res() res) {
    const user = await this.userService.findOneById(parseInt(id));

    user.password = undefined;
    return new ResponseDto().sendSuccess('success', user, res);
  }
}
