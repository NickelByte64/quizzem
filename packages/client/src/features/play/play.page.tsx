import type { Player, Session } from '@quizzem/shared';
import { useEffect, useState, type JSX } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router';
import { useClientMessages, useConnectionOpen, useServerMessages } from '../../contexts/web-socket/web-socket.context';

const LOCALSTORAGE_PLAYER_SESSION_IDENTIFIER = 'playerSessionId';

type PlayerCreateFormValues = {
  name: string;
};

export function PlayPage(): JSX.Element {
  const { sessionId } = useParams();

  const [player, setPlayer] = useState<Player | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PlayerCreateFormValues>({
    defaultValues: { name: '' },
  });

  const send = useClientMessages();
  useServerMessages((msg) => {
    if (msg.type === 'SESSION:STATE') setSession(msg.payload.session);
    if (msg.type === 'PLAYER:RETRIEVE') setPlayer(msg.payload.player);
    if (msg.type === 'SESSION:JOINED') {
      setJoined(true);
      setError(null);
    }
    if (msg.type === 'SESSION:ERROR' || msg.type === 'PLAYER:ERROR') {
      // The identity we hold cannot be used any more, so drop it and show the form again.
      localStorage.removeItem(LOCALSTORAGE_PLAYER_SESSION_IDENTIFIER);
      setPlayer(null);
      setJoined(false);
      setError(msg.payload.message);
    }
  });

  // Log in again after each connection is established – otherwise, following a reconnect,
  // the server will not recognise the new socket and the player will remain ‘offline’.
  useConnectionOpen(() => {
    if (!sessionId) return;

    send({ type: 'SESSION:RETRIEVE', payload: { sessionId } });

    const playerId = readStoredPlayerId(sessionId);
    if (playerId) send({ type: 'PLAYER:RETRIEVE', payload: { playerId } });
  });

  // Joining is the second step: the player id is only known once the server has confirmed
  // the identity – both for a fresh join and after a reconnect.
  useEffect(() => {
    if (!player || !sessionId) return;

    localStorage.setItem(LOCALSTORAGE_PLAYER_SESSION_IDENTIFIER, `${player.id}:${sessionId}`);
    send({ type: 'SESSION:JOIN', payload: { playerId: player.id, sessionId } });
  }, [player, sessionId, send]);

  const onSubmit: SubmitHandler<PlayerCreateFormValues> = (data) => {
    localStorage.removeItem(LOCALSTORAGE_PLAYER_SESSION_IDENTIFIER);
    setError(null);
    send({ type: 'PLAYER:CREATE', payload: { name: data.name } });
  };

  const isPlayerReady = session?.players.find((p) => p.id === player?.id)?.ready;

  return (
    <div>
      <h1>Quiz Page</h1>
      {error && <p role="alert">{error}</p>}

      {!joined && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Name</span>
            <input
              {...register('name', {
                required: 'Please enter a name.',
                maxLength: { value: 20, message: 'Please use at most 20 characters.' },
              })}
            />
          </label>
          {errors.name && <span role="alert">{errors.name.message}</span>}
          <button type="submit">Join Session</button>
        </form>
      )}

      {joined && player && (
        <button
          type="button"
          onClick={() => {
            if (isPlayerReady) {
              send({ type: 'PLAYER:SET_NOT_READY', payload: { playerId: player.id } });
            } else {
              send({ type: 'PLAYER:SET_READY', payload: { playerId: player.id } });
            }
          }}>
          {isPlayerReady ? 'Not ready' : 'Ready up'}
        </button>
      )}

      {session && (
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
        </>
      )}
    </div>
  );
}

// Only an identity that belongs to the session in the URL may be restored – a player stored
// for an earlier quiz no longer exists on the server.
function readStoredPlayerId(sessionId: string): string | null {
  const stored = localStorage.getItem(LOCALSTORAGE_PLAYER_SESSION_IDENTIFIER);
  if (!stored) return null;

  const [playerId, storedSessionId] = stored.split(':');
  if (!playerId || storedSessionId !== sessionId) {
    localStorage.removeItem(LOCALSTORAGE_PLAYER_SESSION_IDENTIFIER);
    return null;
  }

  return playerId;
}
