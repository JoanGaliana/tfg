import { Box } from "@mui/material"
import React, { useContext } from "react"
import MainAppBar from "../components/MainAppBar";
import UserGroups from "../components/UserGroups";
import { AuthContext } from "../contexts/AuthContext";
import { useCurrentUserQuery } from "../services/UsersService";

function Dashboard() {
  const { authToken } = useContext(AuthContext)
  const { data: currentUser } = useCurrentUserQuery(authToken)

  const currentUserId = currentUser?.id;

  return <React.Fragment>
    <MainAppBar />
    <Box
      component="main"
      sx={{
        mt: '5rem',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <UserGroups userId={currentUserId}></UserGroups>
    </Box>
  </React.Fragment>
}

export default Dashboard