import { Box, Fab } from "@mui/material";
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import MainAppBar from "../components/MainAppBar";
import UserGroups from "../components/UserGroups";
import { AuthContext } from "../contexts/AuthContext";
import { useCurrentUserQuery } from "../services/UsersService";

const fabStyles = {
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
};

function Dashboard() {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUserQuery(authToken);

  const currentUserId = currentUser?.id;

  const onFabClick = () => navigate("/groups/new");

  return (
    <>
      <MainAppBar title="Mis grupos" />
      <Box
        component="main"
        sx={{
          pt: "1rem",
        }}
      >
        <UserGroups userId={currentUserId} />
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        sx={fabStyles}
        onClick={onFabClick}
        data-cy="create-group"
      >
        <AddIcon />
      </Fab>
    </>
  );
}

export default Dashboard;
