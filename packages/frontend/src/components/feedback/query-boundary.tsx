import type { JSX } from "react";
import { Box } from "~/src/components";

type QueryBoundaryProps = {
  isLoading: boolean;
  isError: boolean;
  hasContent: boolean | undefined;
  skeletons: JSX.Element;
  content: JSX.Element;
  emptyContent: JSX.Element;
  error: JSX.Element;
};

export function QueryBoundary(
  props: Readonly<QueryBoundaryProps>,
): JSX.Element {
  return (
    <Box sx={{ mb: 8 }}>
      <ShowComponent {...props} />
    </Box>
  );
}

function ShowComponent(props: Readonly<QueryBoundaryProps>) {
  const {
    content,
    emptyContent,
    error,
    isError,
    isLoading,
    skeletons,
    hasContent,
  } = props;

  if (isLoading) return skeletons;
  if (isError) return error;
  if (hasContent) return content;
  return emptyContent;
}
