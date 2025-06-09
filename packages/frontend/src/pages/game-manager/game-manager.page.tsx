import { UUID } from "crypto";
import { JSX } from "react";
import { useParams } from "react-router";
import { Layout } from "~/components";
import { useGetRemote } from "~/utils";

export function GameManagerPage(): JSX.Element {
  const { id } = useParams<{ id: UUID }>();

  const { data } = useGetRemote(`game/${id}`);

  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
}
