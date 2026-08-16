import type { JSX } from 'react';
import { Link, Outlet } from 'react-router';

export function Root(): JSX.Element {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="host">Host</Link>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
