type SocketConstants = 'CLOCK';

export type SocketMessageData<T> = {
  type: SocketConstants;
  payload: T;
};

export type ClockData = { now: number };
export type SocketServerClockData = SocketMessageData<ClockData>;
