import type { ClientMessage } from '@quizzem/shared';
import type { RawData } from 'ws';

function parseClientMessage(raw: RawData): ClientMessage {
  let msg: ClientMessage;
  try {
    msg = JSON.parse(raw.toString());
  } catch (e) {
    console.error(e);
    throw new Error('Could not parse the client message');
  }
  return msg;
}

export const WsParser = { parseClientMessage };
