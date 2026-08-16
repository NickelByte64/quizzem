import { useEffect, type JSX } from 'react';
import { useParams } from 'react-router';
import { useClientMessages } from '../../contexts/web-socket/web-socket.context';

export function PlayPage(): JSX.Element {
  const { id } = useParams();

  const send = useClientMessages();

  useEffect(() => {
    send({ type: 'SESSION:JOIN', payload: { player: { name: 'test-user-1' } } });
  }, []);

  return (
    <div>
      <h1>Quiz Page</h1>

      <pre>{JSON.stringify({ id }, null, 2)}</pre>
    </div>
  );
}
