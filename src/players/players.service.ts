import { Injectable } from '@nestjs/common';
import {PATH_FACTORY_DATABASE_FILE} from './constant';
import Player from './interface/player';
import { readFileSync } from 'fs';

@Injectable()
export class PlayersService {

  private players: Player[] = [];

  constructor() {
    console.log("> HAS been instantiate");
    if(!this.players.length) {
      this.players = JSON.parse(readFileSync(PATH_FACTORY_DATABASE_FILE, {encoding: "utf-8"}));
    }
  }

  getPaginate({page, limit}: {page: number, limit: number}) {

    const {count} = this;
    const totalPages = Math.ceil(count / limit);

    if(page > totalPages) {
      page = totalPages;
    } else if(page <= 0) {
      page = 1;
    }

    if(limit > count) {
      limit = count;
    } else if(limit <= 0) {
      limit = 10;
    }

    const indexStart = (page-1) * limit;
    const indexEnd = indexStart + limit;

    return {
      totalPages,
      totalItems: count,
      limit,
      page,
      items: this.getPartial({indexStart, indexEnd})
    };
  }

  getPartial({indexStart, indexEnd}: {indexStart: number, indexEnd: number}) {
    return this.players.slice(indexStart, indexEnd);
  }

  get count(): number {
    return this.players.length;
  }

  create(player: Player) {
    this.players.push(player);
  }

  findOne(id: number): Player | null {
    return this.players.find((player => (
      player.id === id
    ))) || null;
  }

  updateOne(id: number, playerUpdate: Partial<Player>): Player | null {

    let playerUpdated: null | Player = null;

    this.players = this.players.map((player: Player): Player => {

      if(player.id === id) {
        playerUpdated = {
          ...player,
          ...playerUpdate,
        };

        return playerUpdated;
      }
      return player;
    });

    return playerUpdated;
  }

  delete(id: number): Player | null {
    let playerDeleted: Player | null = null;

    this.players = this.players.filter((player => {

      if(player.id !== id) {
        return true;
      }

      playerDeleted = player;
      return false;

    })) || null;

    return playerDeleted;
  }
}
