import { Controller, Post } from '@nestjs/common';
import { GameDto } from '~/src/features/game/game.dto';
import { GameMapper } from '~/src/features/game/game.mapper';
import { HostService } from '~/src/features/host/host.service';

@Controller('hosts')
export class HostController {
  private readonly hostService: HostService;

  constructor(hostService: HostService) {
    this.hostService = hostService;
  }

  @Post('/create-game')
  async createGame(): Promise<GameDto> {
    const gameModel = await this.hostService.createGame();
    return GameMapper.toDto(gameModel);
  }
}
