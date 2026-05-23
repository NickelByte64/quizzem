import { JSX } from "react";
import { RouteObject, useRoutes } from "react-router";

export function createRoutes(
  prefix: string,
  routes: RouteObject[]
): RouteObject[] {
  return routes.map((route) => {
    return {
      ...route,
      // Replace multiple slashes with a single slash
      path: `${prefix}/${route.path}`.replace(/\/+/g, "/"),
    };
  });
}

type LayoutRoutesProps = {
  routes: RouteObject[];
};

export function LayoutRoutes(props: Readonly<LayoutRoutesProps>): JSX.Element {
  const { routes } = props;

  const routeElements = useRoutes(routes);

  return <>{routeElements}</>;
}
