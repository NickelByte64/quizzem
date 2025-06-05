import { RiCloseFill, RiMenu2Fill } from "@remixicon/react";
import { JSX } from "react";
import { IconButton } from "~/components";
import { useNavigationStore } from "~/components/global/navigation/navigation.store";

export function NavigationAction(): JSX.Element {
  const { toggleDrawerState, drawerState } = useNavigationStore();

  return (
    <IconButton onClick={() => toggleDrawerState(drawerState)}>
      {drawerState ? <RiCloseFill /> : <RiMenu2Fill />}
    </IconButton>
  );
}
