import { useEffect, useState, type JSX } from 'react';
import { useWebSocket } from './lib/useWebSocket';

export function App(): JSX.Element {
  const [serverTime, setServerTime] = useState<number | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const { send } = useWebSocket({
    onMessage: (data) => {
      if (data.type === 'CLOCK') setServerTime(data.payload.now);
      if (data.type === 'SEND_QR_CODE') setQrCode(data.payload.qrCode);
    },
  });

  useEffect(() => {
    send({ type: 'REQUEST_QR_CODE' });
  }, [qrCode, send]);

  return (
    <div>
      <div>{serverTime ? new Date(serverTime).toLocaleTimeString() : 'Loading...'}</div>
      {qrCode && <img src={qrCode} />}
    </div>
  );
}

