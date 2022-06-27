import { Box, Divider, Fab, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MainAppBar from "../components/MainAppBar";
import { AuthContext } from "../contexts/AuthContext";
import { useGetGroupByIdQuery } from "../services/GroupsService";
import GroupBottomNavigation from "../components/GroupBottomNavigation";
import GroupMembers from "../components/GroupMembers";

const fabStyles = {
  position: "fixed",
  bottom: "5rem",
  right: "2rem",
};

function GroupMembersPage() {
  const { authToken } = useContext(AuthContext);

  const { id: groupId } = useParams();

  const { data } = useGetGroupByIdQuery(groupId, authToken);

  const navigate = useNavigate();
  const onFabClick = () => navigate(`/groups/${groupId}/add-member`);

  const title = data?.name || "Grupo";
  const goBackUrl = "/dashboard";

  return (
    <>
      <MainAppBar title={title} goBackUrl={goBackUrl} />
      <Box
        component="main"
        sx={{
          pt: "1rem",
          pb: "6rem",
        }}
      >
        <Box
          sx={{
            mx: "5rem",
          }}
        >
          <Typography variant="h5" gutterBottom component="div">
            Miembros
          </Typography>
        </Box>

        <Divider sx={{ my: "1.5rem" }} />
        <GroupMembers groupId={groupId} />
        <Fab
          color="primary"
          aria-label="add"
          sx={fabStyles}
          onClick={onFabClick}
          data-cy="add-member"
        >
          <AddIcon />
        </Fab>
      </Box>

      <GroupBottomNavigation active="members" groupId={groupId || ""} />
    </>
  );
}

export default GroupMembersPage;
