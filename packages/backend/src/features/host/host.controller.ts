import { Controller, Post } from '@nestjs/common';
import { HostService } from '~/src/features/host/host.service';

@Controller('hosts')
export class HostController {
  private readonly hostService: HostService;

  constructor(hostService: HostService) {
    this.hostService = hostService;
  }

  @Post('/create-game')
  async createGame() {
    return await this.hostService.createGame();
  }
}
