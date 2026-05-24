import { Controller, Post } from '@nestjs/common';
import { UUID } from 'crypto';
import { GameMapper } from '~/src/features/game/game.mapper';
import { HostService } from '~/src/features/host/host.service';

@Controller('hosts')
export class HostController {
  private readonly hostService: HostService;

  constructor(hostService: HostService) {
    this.hostService = hostService;
  }

  @Post('/create-game')
  async createGame(): Promise<{ id: UUID }> {
    const gameModel = await this.hostService.createGame();
    return { id: GameMapper.toDto(gameModel).id };
  }
}
