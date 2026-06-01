import { Link, Outlet } from "react-router";
import { ROUTES } from "~/src/router/router";

export function Layout() {
  return (
    <>
      <header>
        <ul>
          {ROUTES.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  );
}
