import { type SocketMessageData } from '@quizzem/shared';
import { useCallback, useEffect, useRef } from 'react';

const MAX_RETRY_ATTEMPTS: number = 10;

type UseWebSocketProps<T> = {
  reconnect?: boolean;
  onMessage?: (data: SocketMessageData<T>) => void;
};

export function useWebSocket<T>(props: Readonly<UseWebSocketProps<T>>) {
  const { onMessage, reconnect = true } = props;

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<number | null>(null);
  const attemptRef = useRef(0);

  // Socket handlers read the latest props from refs at call time, so the
  // connection effect below never has to re-run when the caller re-renders.
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;
  const reconnectRef = useRef(reconnect);
  reconnectRef.current = reconnect;

  useEffect(() => {
    function connect() {
      const WS_CLIENT = new WebSocket(`ws://${window.location.host}/ws`);
      wsRef.current = WS_CLIENT;

      WS_CLIENT.onopen = () => {
        console.log('WebSocket connection established on client side');
        attemptRef.current = 0;
      };

      WS_CLIENT.onmessage = (event) => {
        onMessageRef.current?.(JSON.parse(event.data));
      };

      WS_CLIENT.onclose = (event) => {
        if (reconnectRef.current && event.code !== 1000) {
          console.log('Trying to reconnect...');
          scheduleReconnect();
        }
      };

      WS_CLIENT.onerror = (event) => {
        console.error(event);
        WS_CLIENT.close();
      };
    }

    function scheduleReconnect() {
      const attempt = attemptRef.current;
      if (attempt >= MAX_RETRY_ATTEMPTS) return; // stop after max retry attempts

      const baseDelay = Math.min(1000 * 2 ** attempt, 30000);
      const jitter = Math.random() * 1000;
      const delay = baseDelay + jitter;

      reconnectTimer.current = window.setTimeout(() => {
        attemptRef.current += 1;
        connect();
      }, delay);
    }

    connect();

    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close(1000, 'hook cleanup');
    };
  }, []);

  const send = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { send, wsRef };
}
