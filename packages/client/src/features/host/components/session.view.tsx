import type { Session } from '@quizzem/shared';
import type { JSX } from 'react';
import { useClientMessages } from '../../../contexts/web-socket/web-socket.context';

type SessionViewProps = {
  session: Session | null;
};

export function SessionView(props: Readonly<SessionViewProps>): JSX.Element | null {
  const { session } = props;

  const send = useClientMessages();

  if (!session) return null;

  return (
    <>
      <h2>Session</h2>
      <p>Session State:</p>
      <p>{session.state}</p>

      <p>Host:</p>
      {session.host?.name}
      <p>Players:</p>
      <ul>
        {session.players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          send({ type: 'QUIZ:START' });
        }}>
        Start Quiz
      </button>
    </>
  );
}
