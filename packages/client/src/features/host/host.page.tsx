import type { CreateGameRoomDto } from '@quizzem/shared';
import { type JSX } from 'react';
import { useGetQuizzemData, usePostQuizzemData } from '../../api/use-quizzem-api';

export function HostPage(): JSX.Element {
  const { data } = useGetQuizzemData('/game-room');
  const { mutate } = usePostQuizzemData<CreateGameRoomDto, void>('/game-room');
  console.log(data);

  return (
    <div>
      <h1>Host</h1>
      <h3>Create a room</h3>

      <div>
        <button
          type="button"
          onClick={() => {
            mutate({ name: 'test name' });
          }}>
          Create a game room
        </button>

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
