import type { Session } from '@quizzem/shared';
import { useState, type JSX } from 'react';
import { useClientMessages, useServerMessages } from '../../contexts/web-socket/web-socket.context';

export function HostPage(): JSX.Element {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useServerMessages((msg) => {
    if (msg.type === 'SESSION:CREATE') setQrCode(msg.payload.qrCode);
    if (msg.type === 'SESSION:STATE') setSession(msg.payload.session);
  });
  const send = useClientMessages();

  return (
    <div>
      <h1>Host</h1>
      <h3>Create a quiz session</h3>

      <button type="button" onClick={() => send({ type: 'SESSION:REQUEST' })}>
        Create session
      </button>

      {qrCode && <img src={qrCode} alt="Join via qr code" />}
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  );
}
