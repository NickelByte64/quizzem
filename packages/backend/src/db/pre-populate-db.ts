import { Injectable } from '@nestjs/common';

@Injectable()
export class PrePopulateDB {
  constructor() {}

  run() {
    console.log('populating...');
  }
}
