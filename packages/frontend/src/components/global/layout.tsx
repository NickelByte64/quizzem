import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import { Header } from "~/src/components/global/header";

export function Layout() {
  return (
    <Container maxWidth="xl">
      <Header />

      <Box component={"main"}>
        <Outlet />
      </Box>
      <footer className="p-4 bg-bg-200">footer</footer>
    </Container>
  );
}
