import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material"
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useCurrentUserQuery } from "../services/UsersService";

function MainAppBar() {
  const { authToken } = useContext(AuthContext)
  const { logout } = useContext(AuthContext);

  const { isSuccess, data: currentUser } = useCurrentUserQuery(authToken);

  return <AppBar position="fixed">
    <Toolbar
      sx={{
        pr: '24px', // keep right padding when drawer closed
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{
          marginRight: '36px',
        }}
      >
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        Dashboard
      </Typography>
      <Button color="inherit" onClick={logout}>
        Cerrar sesión {isSuccess && <React.Fragment>({currentUser?.email})</React.Fragment>}
      </Button>

    </Toolbar>
  </AppBar>
}

export default MainAppBar