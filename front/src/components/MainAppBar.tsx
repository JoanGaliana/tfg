import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useCurrentUserQuery } from "../services/UsersService";

interface MainAppBarParams {
  title: string;
  goBackUrl?: string | undefined;
}

function MainAppBar({ title, goBackUrl }: MainAppBarParams) {
  const { authToken } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const { isSuccess, data: currentUser } = useCurrentUserQuery(authToken);

  return (
    <AppBar position="sticky">
      <Toolbar>
        {!!goBackUrl && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => navigate(goBackUrl)}
            sx={{
              marginRight: "36px",
            }}
            data-cy="nav-back"
          >
            <ArrowBackIcon />
          </IconButton>
        )}

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
          data-cy="nav-title"
        >
          {title}
        </Typography>
        <Button color="inherit" onClick={logout}>
          Cerrar sesión {isSuccess && <>({currentUser?.email})</>}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

MainAppBar.defaultProps = {
  goBackUrl: undefined,
};

export default MainAppBar;
