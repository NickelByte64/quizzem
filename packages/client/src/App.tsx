import { type JSX } from 'react';
import { WebSocketProvider } from './contexts/web-socket/web-socket.context';
import { HostPage } from './features/host/host.page';

export function App(): JSX.Element {
  // const [serverTime, setServerTime] = useState<number | null>(null);
  // const [qrCode, setQrCode] = useState<string | null>(null);

  // const { send } = useWebSocket({
  //   onMessage: (data) => {
  //     if (data.type === 'CLOCK') setServerTime(data.payload.now);
  //     if (data.type === 'QR_CODE:SEND') setQrCode(data.payload.qrCode);
  //   },
  // });

  // useEffect(() => {
  //   send({ type: 'QR_CODE:REQUEST' });
  // }, [qrCode, send]);

  return (
    <WebSocketProvider>
      {/* <div>
        <div>{serverTime ? new Date(serverTime).toLocaleTimeString() : 'Loading...'}</div>
        {qrCode && <img src={qrCode} />} */}

      <HostPage />
      {/* </div> */}
    </WebSocketProvider>
  );
}

