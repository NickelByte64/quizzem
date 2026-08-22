import type { Player, Session } from '@quizzem/shared';
import { useEffect, useState, type JSX } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useClientMessages, useConnectionOpen, useServerMessages } from '../../contexts/web-socket/web-socket.context';

type HostCreateFormValues = {
  name: string;
};

const LOCALSTORAGE_HOST_SESSION_IDENTIFIER = 'hostSessionId';

export function HostPage(): JSX.Element {
  const [sessionJoin, setSessionJoin] = useState<{ qrCode: string; plainUrl: string } | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [host, setHost] = useState<Player | null>(null);
  const [error, setError] = useState<string | null>(null);

  useServerMessages((msg) => {
    if (msg.type === 'SESSION:JOIN_INFO') setSessionJoin(msg.payload);
    if (msg.type === 'SESSION:STATE') {
      setSession(msg.payload.session);
      setError(null);
    }
    if (msg.type === 'HOST:RETRIEVE') setHost(msg.payload.host);
    if (msg.type === 'SESSION:ERROR' || msg.type === 'HOST:ERROR') setError(msg.payload.message);
  });
  const send = useClientMessages();

  const { register, handleSubmit } = useForm<HostCreateFormValues>({
    defaultValues: { name: '' },
  });

  // Restore after every connection is established – this also applies after a
  // reconnect, not just when the page is first loaded.
  useConnectionOpen(() => {
    const stored = localStorage.getItem(LOCALSTORAGE_HOST_SESSION_IDENTIFIER);
    if (!stored) return;

    const [hostId, sessionId] = stored.split(':');
    if (hostId) send({ type: 'HOST:RETRIEVE', payload: { hostId } });
    if (sessionId) send({ type: 'SESSION:RETRIEVE', payload: { sessionId } });
  });

  useEffect(() => {
    if (host && session) {
      localStorage.setItem(LOCALSTORAGE_HOST_SESSION_IDENTIFIER, `${host.id}:${session.id}`);
    }
  }, [host, session]);

  const onSubmit: SubmitHandler<HostCreateFormValues> = (data) => {
    localStorage.removeItem(LOCALSTORAGE_HOST_SESSION_IDENTIFIER);
    send({ type: 'HOST:CREATE', payload: { name: data.name } });
  };

  return (
    <div>
      <h1>Host</h1>
      <h3>Create a quiz session</h3>

      {error && <p role="alert">{error}</p>}

      {!host && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Host name</span>
            <input {...register('name')} />
          </label>

          <button type="submit">Create host</button>
        </form>
      )}

      <div>
        {host && !session && (
          <>
            <pre>{JSON.stringify(host, null, 2)}</pre>
            <button type="button" onClick={() => send({ type: 'SESSION:CREATE', payload: { hostId: host.id } })}>
              Create session
            </button>
          </>
        )}

        {sessionJoin && (
          <>
            <img src={sessionJoin.qrCode} alt="Join via qr code" />
            <div>{sessionJoin.plainUrl}</div>
          </>
        )}

        <SessionView session={session} host={host} />
      </div>
    </div>
  );
}

type SessionViewProps = {
  session: Session | null;
  host: Player | null;
};

function SessionView(props: Readonly<SessionViewProps>): JSX.Element | null {
  const { session, host } = props;

  const send = useClientMessages();

  if (!session || !host) return null;

  // Mirrors the server rule: disconnected players are ignored, so one player leaving
  // the lobby cannot block the start.
  const presentPlayers = session.players.filter((p) => p.connected);
  const allPlayersReady = presentPlayers.length > 0 && presentPlayers.every((p) => p.ready);

  return (
    <>
      <h2>Session</h2>
      <p>Session State:</p>
      <p>{session.state}</p>

      <p>Host:</p>
      {session.host?.name}
      <p>Players:</p>

      {session.players.length === 0 ? (
        <p>No players have joined yet.</p>
      ) : (
        <ul>
          {session.players.map((player) => (
            <li key={player.id}>
              {player.name} - {player.ready ? 'ready' : 'not ready'}
              {!player.connected && ' (offline)'}
            </li>
          ))}
        </ul>
      )}

      {session.state === 'LOBBY' && (
        <button
          type="button"
          disabled={!allPlayersReady}
          onClick={() => {
            send({ type: 'SESSION:START', payload: { hostId: host.id } });
          }}>
          Start Quiz
        </button>
      )}
    </>
  );
}
