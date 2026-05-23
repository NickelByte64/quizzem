import { JSX, useState } from "react";
import { Link } from "react-router";
import { Button, Headline, Slider } from "~/components";
import { Auth } from "~/pages/home/components/auth";
import { useAuth } from "~/utils";

export function HomePage(): JSX.Element {
  const [openAuth, setOpenAuth] = useState(false);
  const { data: authenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className="absolute top-1/2 left-1/2 flex h-screen w-screen -translate-x-1/2 -translate-y-1/2 transform">
        <div className="flex flex-col w-full items-center justify-center gap-4">
          <Headline className="text-center">Willkommen bei Quizzem</Headline>
          <Button className="w-48">
            <Link to={"/game"}>Spiel beitreten</Link>
          </Button>

          {authenticated ? (
            <Button className="w-48" variant="secondary">
              <Link to={"/game/create"}>Spiel erstellen</Link>
            </Button>
          ) : (
            <Button
              className="w-48"
              variant="secondary"
              onClick={() => setOpenAuth(true)}
            >
              Spiel erstellen
            </Button>
          )}
        </div>
      </div>
      <Slider open={openAuth} setOpen={setOpenAuth}>
        <Auth />
      </Slider>
    </>
  );
}
