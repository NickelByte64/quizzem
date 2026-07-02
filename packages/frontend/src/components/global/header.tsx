import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
  type Theme,
} from "@mui/material";
import { RiMenuLine } from "@remixicon/react";
import { useState, type JSX } from "react";
import { Link } from "react-router";
import { ROUTES } from "~/src/router/router";

export function Header(): JSX.Element {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const isSmallView = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );
  const { palette } = useTheme();

  return (
    <Stack
      component={"header"}
      direction={"row"}
      sx={{
        my: 2,
        height: 56,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {isSmallView ? (
        <>
          <Stack direction={"row"} sx={{ gap: 2, alignItems: "center" }}>
            <IconButton onClick={toggleDrawer(true)}>
              <RiMenuLine />
            </IconButton>

            <Box>Logo</Box>
          </Stack>

          <Drawer open={open} onClose={toggleDrawer(false)}>
            HI
          </Drawer>
        </>
      ) : (
        <>
          <Box>Logo</Box>

          <Box
            component={"ul"}
            sx={{
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: "1fr",
              backgroundColor: palette.background.paper,
              listStyle: "none",
              justifyContent: "center",
              my: 0,
              mx: "auto",
              p: 2,
              width: "fit-content",
              borderRadius: 16,
              gap: 2,
            }}
          >
            {ROUTES.map((route) => (
              <Box
                component={"li"}
                key={route.path}
                sx={{ textAlign: "center" }}
              >
                <Box
                  component={Link}
                  to={route.path}
                  sx={{ color: palette.primary.main, textDecoration: "none" }}
                >
                  <Box component={"span"}>{route.name}</Box>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}

      <Avatar />
    </Stack>
  );
}

//  <header className="p-4 bg-bg-200">
//         <ul>
//           {ROUTES.map((route) => (
//             <li key={route.path}>
//               <Link to={route.path}>{route.name}</Link>
//             </li>
//           ))}
//         </ul>
//       </header>
