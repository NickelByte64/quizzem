import type { QueryObserverBaseResult } from "@tanstack/react-query";
import type { JSX } from "react";
import { Alert, Button } from "~/src/components";

type RetryAlertProps = {
  refetch: QueryObserverBaseResult["refetch"];
};

export function RetryAlert(props: Readonly<RetryAlertProps>): JSX.Element {
  const { refetch } = props;

  return (
    <Alert
      severity="error"
      title="We couldn't load your games."
      action={
        <Button variant="outlined" onClick={() => refetch()}>
          Retry
        </Button>
      }
    />
  );
}
