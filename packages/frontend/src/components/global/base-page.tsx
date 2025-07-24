import { JSX } from "react";
import { Outlet } from "react-router";
import { Header } from "~/components/global/header";
import { Navigation } from "~/components/global/navigation/navigation";

export function BasePage(): JSX.Element {
  return (
    <>
      <Header />
      <Navigation.Drawer>
        <Navigation />
      </Navigation.Drawer>

      <main className="px-8 pt-20 pb-8">
        <Outlet />
      </main>
    </>
  );
}
