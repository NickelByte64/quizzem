import { Link, Outlet } from "react-router";
import { ROUTES } from "~/src/router/router";

export function Layout() {
  return (
    <>
      <header className="p-4 bg-bg-200">
        <ul>
          {ROUTES.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </header>
      <main className="p-4 bg-bg-100">
        <Outlet />
      </main>
      <footer className="p-4 bg-bg-200">footer</footer>
    </>
  );
}
