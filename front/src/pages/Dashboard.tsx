import { Box, Fab } from "@mui/material"
import React, { useContext } from "react"
import MainAppBar from "../components/MainAppBar";
import UserGroups from "../components/UserGroups";
import { AuthContext } from "../contexts/AuthContext";
import { useCurrentUserQuery } from "../services/UsersService";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const fabStyles = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem'
}

function Dashboard() {
  const { authToken } = useContext(AuthContext)
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUserQuery(authToken)

  const currentUserId = currentUser?.id;

  const onFabClick = () => navigate('/groups/new')

  return <React.Fragment>
    <MainAppBar title="Mis grupos"/>
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

    <Fab color="primary" aria-label="add" sx={fabStyles} onClick={onFabClick} data-cy="create-group">
      <AddIcon />
    </Fab>
  </React.Fragment>
}

export default Dashboard