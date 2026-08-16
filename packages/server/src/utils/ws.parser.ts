import { clientMessageSchema, type ClientMessage } from '@quizzem/shared';
import type { RawData } from 'ws';

function parseClientMessage(raw: RawData): ClientMessage | null {
  try {
    const result = clientMessageSchema.safeParse(JSON.parse(raw.toString()));
    return result.success ? result.data : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const WsParser = { parseClientMessage };
