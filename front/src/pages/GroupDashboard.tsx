import { Box, Divider, Fab, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MainAppBar from "../components/MainAppBar";
import { AuthContext } from "../contexts/AuthContext";
import { useGetGroupByIdQuery } from "../services/GroupsService";
import GroupBottomNavigation from "../components/GroupBottomNavigation";
import GroupSpendings from "../components/GroupSpendings";

const fabStyles = {
  position: "fixed",
  bottom: "5rem",
  right: "2rem",
};

function GroupDashboard() {
  const { authToken } = useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetGroupByIdQuery(id, authToken);

  const title = data?.name || "Grupo";
  const goBackUrl = "/dashboard";
  const onFabClick = () => navigate(`/groups/${id}/create-spending`);

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
            Gastos
          </Typography>
        </Box>

        <Divider sx={{ my: "1.5rem" }} />
        <GroupSpendings groupId={id} />
        <Fab
          color="primary"
          aria-label="add"
          sx={fabStyles}
          onClick={onFabClick}
          data-cy="create-spending"
        >
          <AddIcon />
        </Fab>
      </Box>

      <GroupBottomNavigation active="spendings" groupId={id || ""} />
    </>
  );
}

export default GroupDashboard;
