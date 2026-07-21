import type { JSX } from "react";
import { List } from "~/src/components";

export function ListGamesSkeletons(): JSX.Element {
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <List.Item key={i}>
          <List.ItemCardSkeleton />
        </List.Item>
      ))}
    </List>
  );
}
