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
type OpenListener = () => void;

type WebSocketContextType = {
  send: SendHandler;
  subscribe: (listener: MessageListener) => () => void;
  subscribeOpen: (listener: OpenListener) => () => void;
  isOpen: () => boolean;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider(props: Readonly<PropsWithChildren>): JSX.Element {
  const { children } = props;

  const listenersRef = useRef(new Set<MessageListener>());
  const openListenersRef = useRef(new Set<OpenListener>());

  const { send, wsRef } = useWebSocket({
    onMessage: (msg) => listenersRef.current.forEach((listener) => listener(msg)),
    onOpen: () => openListenersRef.current.forEach((listener) => listener()),
  });

  const subscribe = useCallback((listener: MessageListener) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  const subscribeOpen = useCallback((listener: OpenListener) => {
    openListenersRef.current.add(listener);
    return () => {
      openListenersRef.current.delete(listener);
    };
  }, []);

  const isOpen = useCallback(() => wsRef.current?.readyState === WebSocket.OPEN, [wsRef]);

  const value = useMemo(() => ({ send, subscribe, subscribeOpen, isOpen }), [send, subscribe, subscribeOpen, isOpen]);

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

/**
 * Executes `onOpen` after every connection (re)establishment – and immediately if
 * the connection is already established at the time of mounting. This allows a view to
 * re-register with the server automatically following a reconnect.
 */
export function useConnectionOpen(onOpen: OpenListener): void {
  const { subscribeOpen, isOpen } = useWebSocketContext();

  const handlerRef = useRef(onOpen);
  handlerRef.current = onOpen;

  useEffect(() => {
    if (isOpen()) handlerRef.current();
    return subscribeOpen(() => handlerRef.current());
  }, [subscribeOpen, isOpen]);
}
