import { Box, Container } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import MainAppBar from "../components/MainAppBar";
import { AuthContext } from "../contexts/AuthContext";
import { useGetGroupByIdQuery } from "../services/GroupsService";
import GroupBottomNavigation from "../components/GroupBottomNavigation";
import DeleteGroupForm from "../components/DeleteGroupForm";

function GroupConfigurationPage() {
  const { authToken } = useContext(AuthContext);

  const { id: groupId } = useParams();

  const { data } = useGetGroupByIdQuery(groupId, authToken);

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
        <Container maxWidth="sm" sx={{ height: "100%" }}>
          <DeleteGroupForm groupId={groupId || ""} />
        </Container>
      </Box>
      <GroupBottomNavigation active="configuration" groupId={groupId || ""} />
    </>
  );
}

export default GroupConfigurationPage;
