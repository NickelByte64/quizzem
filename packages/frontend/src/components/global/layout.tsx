import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/host">Host</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
          <li>
            <Link to="/player">Player</Link>
          </li>
        </ul>
      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  );
}
