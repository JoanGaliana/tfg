import { AppBar, Toolbar, IconButton, Typography, Badge, Button, Box } from "@mui/material"
import React, { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

function Dashboard() {
  const { logout, authToken, isAuthenticated } = useContext(AuthContext);

  return <React.Fragment>
    <head>
      <title>Dashboard</title>
    </head>

    <AppBar position="absolute">
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
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
          </Badge>
        </IconButton>

      </Toolbar>
    </AppBar>
    <Box
      component="main"
      sx={{
        mt: '4rem',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >

      <Button onClick={logout}>
        Cerrar sesión
      </Button>
    </Box>
  </React.Fragment>
}

export default Dashboard