import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GroupForm from "../components/GroupForm";
import MainAppBar from "../components/MainAppBar";
import { AuthContext } from "../contexts/AuthContext";
import { Group, useCreateGroupMutation } from "../services/GroupsService";

function CreateGroupPage() {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);

  const { isLoading, mutate: createGroup } = useCreateGroupMutation({
    authToken,
    onSuccess() {
      navigate(`/dashboard`);
    },
  });

  const onSubmit = (group: Group) => {
    if (!isLoading) {
      createGroup(group);
    }
  };

  return (
    <>
      <MainAppBar title="Crear grupo" goBackUrl="/dashboard" />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="sm">
          <GroupForm group={{}} isLoading={isLoading} onSubmit={onSubmit} />
        </Container>
      </Box>
    </>
  );
}

export default CreateGroupPage;
