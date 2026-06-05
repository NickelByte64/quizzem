import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { JSX } from "react";
import { Link } from "react-router";
import { IconButton } from "~/components/actions";
import { Navigation } from "~/components/global/navigation/navigation";
import { useTheme } from "~/utils";

export function Header(): JSX.Element {
  const { toggleTheme, theme } = useTheme();

  return (
    <header className=" p-4 shadow-xl z-99 fixed w-full bg-base-100">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Navigation.Action />

          <Link to={"/"}>
            <span className="uppercase font-black">Quizzem</span>
          </Link>
        </div>

        <IconButton onClick={toggleTheme}>
          {theme === "cupcake" ? <RiMoonLine /> : <RiSunLine />}
        </IconButton>
      </div>
    </header>
  );
}
