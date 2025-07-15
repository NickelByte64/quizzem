import { JSX } from "react";
import { Link } from "react-router";
import { Button, Headline } from "~/components";

export function AccessDeniedPage(): JSX.Element {
  return (
    <>
      <Headline>401 - Access Denied</Headline>
      <p>You must be logged in to view this page.</p>

      <div className="mt-8 flex flex-col gap-4">
        <Button>
          <Link to={"/auth/sign-in"}>Hier anmelden</Link>
        </Button>
        <Button variant="secondary">
          <Link to={"/auth/sign-in"}>Hier registrieren</Link>
        </Button>
      </div>
    </>
  );
}
