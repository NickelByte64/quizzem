import { useState, type JSX } from 'react';
import { useClientMessages, useServerMessages } from '../../contexts/web-socket/web-socket.context';

export function HostPage(): JSX.Element {
  const [serverTime, setServerTime] = useState<number | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  useServerMessages((msg) => {
    if (msg.type === 'CLOCK') setServerTime(msg.payload.now);
    if (msg.type === 'QR_CODE:SEND') setQrCode(msg.payload.qrCode);
  });

  const send = useClientMessages();

  return (
    <div>
      <h1>Host</h1>
      <h3>Create a room</h3>

      <div>
        <button
          type="button"
          onClick={() => {
            send({ type: 'GAME_ROOM:CREATE', payload: { name: 'This is a test game room' } });
          }}>
          Create a game room
        </button>
      </div>
    </div>
  );
}
