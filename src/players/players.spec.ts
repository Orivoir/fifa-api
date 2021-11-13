import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import ModuleConfig from './mod';
import Player from './interface/player';
import { HttpException } from '@nestjs/common';

describe('PlayersService', () => {
  let service: PlayersService;
  let controller: PlayersController

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule(ModuleConfig)
      .compile();

    service = module.get<PlayersService>(PlayersService);
    controller = module.get<PlayersController>(PlayersController);
  });

  it('should return a player data', () => {

    const result: Player = {
      "id":189596,
      "height":185,
      "weight":76,
      "preferredFoot":"Right",
      "bornAt":621640800000,
      "fullName":"Thomas Müller",
      "countryId":21,
      "countryName":"Germany",
      "rangeRank":[87,87],
      "preferredPositions":["CAM","RM","RW"],
      "clubId":21,
    "clubName":"Bayern München ",
      "age":32,
      "teams":[{"id":21,"name":"Bayern München","kitNumber":25,"joinedClub":1218319200000},{"id":1337,"name":"Germany","kitNumber":13}],
      "skills":{
        "defence":{"marking":47,"slideTackle":46,"standTackle":57},
        "mental":{"aggression":62,"reactions":94,"attackPosition":96,"interceptions":58,"vision":85,"composure":84},
        "physical":{"acceleration":66,"stamina":86,"strength":66,"balance":71,"sprintSpeed":67,"agility":72,"jumping":77},
        "passing":{"crossing":85,"shortPass":85,"longPass":79},
        "goalkeeper":{"positioning":14,"diving":6,"handling":7,"kicking":11,"reflexes":14},
        "shooting":{"heading":81,"shotPower":78,"finishing":88,"longShot":82,"curve":81,"freeKickAccuracy":59,"penalties":70,"volleys":84},
        "ballskills":{"ballControl":84,"dribbling":77}
      }
    };

    jest.spyOn(service, "findOne").mockImplementation(() => result);

    expect(controller.findOneV1(189596)).toMatchObject(result);
  });

  it('should not found exception', () => {
    jest.spyOn(service, "findOne").mockImplementation(() => null);
    expect(() => controller.findOneV1(189596)).toThrow(HttpException);
  });
});
