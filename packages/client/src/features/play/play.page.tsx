import { type JSX } from 'react';
import { useParams } from 'react-router';
import { useClientMessages, useConnectionOpen, useServerMessages } from '../../contexts/web-socket/web-socket.context';

const LOCALSTORAGE_PLAYER_IDENTIFIER = 'playerSessionId';

export function PlayPage(): JSX.Element {
  const { sessionId } = useParams();

  const send = useClientMessages();
  useServerMessages((msg) => {
    if (msg.type === 'SESSION:JOINED') {
      const { playerId } = msg.payload;
      localStorage.setItem(LOCALSTORAGE_PLAYER_IDENTIFIER, `${playerId}:${sessionId}`);
    }
  });

  // Log in again after each connection is established – otherwise, following a reconnect,
  // the server will not recognise the new socket and the player will remain ‘offline’.
  useConnectionOpen(() => {
    const playerIdSessionId = localStorage.getItem(LOCALSTORAGE_PLAYER_IDENTIFIER);
    const playerId = playerIdSessionId?.split(':')[0];

    send({
      type: 'SESSION:JOIN',
      payload: { playerId, sessionId, player: { name: 'test-user-1' } },
    });
  });

  return (
    <div>
      <h1>Quiz Page</h1>

      <pre>{JSON.stringify({ sessionId }, null, 2)}</pre>
    </div>
  );
}
