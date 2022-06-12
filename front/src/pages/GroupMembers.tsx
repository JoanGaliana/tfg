import { Box, Divider, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import MainAppBar from "../components/MainAppBar";
import { AuthContext } from "../contexts/AuthContext";
import { useGetGroupByIdQuery } from "../services/GroupsService";
import GroupBottomNavigation from "../components/GroupBottomNavigation";
import GroupMembers from "../components/GroupMembers";

function GroupMembersPage() {
  const { authToken } = useContext(AuthContext);

  const { id } = useParams();

  const { data } = useGetGroupByIdQuery(id, authToken);

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
        <GroupMembers groupId={id} />
      </Box>

      <GroupBottomNavigation active="members" groupId={id || ""} />
    </>
  );
}

export default GroupMembersPage;
