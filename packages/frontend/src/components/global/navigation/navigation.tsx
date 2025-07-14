import { RiExternalLinkFill } from "@remixicon/react";
import { JSX } from "react";
import { Link } from "react-router";
import { Divider } from "~/components";
import { NavigationAction } from "~/components/global/navigation/navigation-action";
import { NavigationDrawer } from "~/components/global/navigation/navigation-drawer";
import { buildNavigationLinks } from "~/components/global/navigation/navigation-links";
import { useNavigationStore } from "~/components/global/navigation/navigation.store";
import { useAuth } from "~/utils";

export function Navigation(): JSX.Element {
  const { toggleDrawerState, drawerState } = useNavigationStore();
  const { data: authenticated } = useAuth();

  const naviagtionLinks = buildNavigationLinks(authenticated);

  return (
    <nav className="p-4">
      <ul className="flex flex-col gap-4">
        {naviagtionLinks.map(({ Icon, identifier, label, links }) => (
          <li key={identifier}>
            <div className="flex items-center gap-2">
              <span>
                <Icon className="text-primary" />
              </span>
              <span className="font-bold">{label}</span>
            </div>
            <Divider className="m-0 w-full" />
            <ul className="flex flex-col gap-2">
              {links.map(({ identifier, label, to, external }) => (
                <li
                  key={identifier}
                  className="pl-8 flex items-center justify-between hover:underline"
                >
                  <Link to={to} onClick={() => toggleDrawerState(drawerState)}>
                    {label}
                  </Link>
                  {external && <RiExternalLinkFill className="text-primary" />}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navigation.Drawer = NavigationDrawer;
Navigation.Action = NavigationAction;
