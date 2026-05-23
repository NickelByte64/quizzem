import { randomUUID, UUID } from 'crypto';

/**
 * A session represents a user's session.
 * The session is stored in the redis store and
 * is used to authenticate and authorize the user.
 * The session is created when the user registers or logs in.
 * Sessions are store persistently in the redis store.
 */
export class SessionRedis {
  /**
   * The unique identifier of the session.
   */
  id: UUID = randomUUID();
  /**
   * The date the session was created.
   */
  // createdAt: Date = new Date();
  /**
   * The ID of the user the session belongs to.
   */
  userId: UUID;
  /**
   * The expiration date of the session by default it's 30 days from the time of creation.
   * If the user logs out or the session is expired it is invalidated
   * and moved from the Redis store to the persistence db for performance reasons.
   */
  expiresAt: Date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  /**
   * The IP address the session was created with.
   */
  // ipAddress: string;
  /**
   * The user agent the session was created with.
   */
  // userAgent: string;
}
