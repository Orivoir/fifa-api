import {
  Controller,
  Version,
  Get,
  Put,
  Delete,
  Post,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  VERSION_NEUTRAL,
  Query,
  DefaultValuePipe,
  Body
} from '@nestjs/common';
import Player from './interface/player';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {

  constructor(private readonly playersService: PlayersService) {}

  @Version(VERSION_NEUTRAL)
  @Get(':id')
  findOneDefault(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_FOUND
  })) id: number) {
    return this.findOneV1(id);
  }

  @Version(VERSION_NEUTRAL)
  @Get()
  findAllDefault(
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(10), ParseIntPipe) page: number
  ) {
    return this.findAllV1(page, limit);
  }

  @Version(VERSION_NEUTRAL)
  @Delete(':id')
  deleteDefault(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_FOUND
  })) id: number) {

    return this.deleteV1(id);
  }

  @Version(VERSION_NEUTRAL)
  @Put(':id')
  updateDefault(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_FOUND
    })) id: number,
    @Body('player', new DefaultValuePipe<any, Partial<Player>>({})) playerUpdate: Partial<Player>
  ) {

    return this.updateV1(id, playerUpdate);
  }

  @Version('1')
  @Get(':id')
  findOneV1(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_FOUND
  })) id: number) {

    const player = this.playersService.findOne(id);

    if(player) {
      return player;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Version('1')
  @Get()
  findAllV1(
    @Query('page', new DefaultValuePipe<string, number>(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe<string, number>(10), ParseIntPipe) limit: number
  ) {
    return this.playersService.getPaginate({page, limit});
  }

  @Version('1')
  @Delete(':id')
  deleteV1(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_FOUND
  })) id: number) {

    const playerDeleted = this.playersService.delete(id);

    if(playerDeleted) {
      return playerDeleted;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Version('1')
  @Put(':id')
  updateV1(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_FOUND
    })) id: number,
    @Body('player', new DefaultValuePipe<any, Partial<Player>>({})) playerUpdate: Partial<Player>
  ) {
    const playerUpdated = this.playersService.updateOne(id, playerUpdate);

    if(playerUpdated) {
      return playerUpdated;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
