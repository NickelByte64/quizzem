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

  useServerMessages((msg) => {
    if (msg.type === 'SESSION:JOIN_INFO') setSessionJoin(msg.payload);
    if (msg.type === 'SESSION:STATE') setSession(msg.payload.session);
    if (msg.type === 'HOST:RETRIEVE') setHost(msg.payload.host);
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
            <button type="button" onClick={() => send({ type: 'SESSION:CREATE', payload: { host } })}>
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
        {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
      </div>
    </div>
  );
}
