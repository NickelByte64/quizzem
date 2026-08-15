import type { ClientMessage, ServerMessage } from '@quizzem/shared';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type JSX,
  type PropsWithChildren,
} from 'react';
import { useWebSocket } from '../../api/use-web-socket';

type SendHandler = (data: ClientMessage) => void;
type MessageListener = (msg: ServerMessage) => void;

type WebSocketContextType = {
  send: SendHandler;
  subscribe: (listener: MessageListener) => () => void;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider(props: Readonly<PropsWithChildren>): JSX.Element {
  const { children } = props;

  const listenersRef = useRef(new Set<MessageListener>());

  const { send } = useWebSocket({
    onMessage: (msg) => listenersRef.current.forEach((listener) => listener(msg)),
  });

  const subscribe = useCallback((listener: MessageListener) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  const value = useMemo(() => ({ send, subscribe }), [send, subscribe]);

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
}

function useWebSocketContext(): WebSocketContextType {
  const ctx = useContext(WebSocketContext);
  if (!ctx) {
    throw new Error('useWebSocketContext must be used withing WebSocketContextProvider');
  }
  return ctx;
}

export function useServerMessages(onMessage: MessageListener): void {
  const { subscribe } = useWebSocketContext();

  const handlerRef = useRef(onMessage);
  handlerRef.current = onMessage;

  useEffect(() => subscribe((msg) => handlerRef.current(msg)), [subscribe]);
}

export function useClientMessages(): SendHandler {
  return useWebSocketContext().send;
}
