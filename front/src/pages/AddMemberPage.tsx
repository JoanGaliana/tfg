import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddMemberForm from "../components/AddMemberForm";
import GroupBottomNavigation from "../components/GroupBottomNavigation";
import MainAppBar from "../components/MainAppBar";
import { AuthContext } from "../contexts/AuthContext";
import {
  AddMemberRequest,
  useAddMemberMutation,
  useGetGroupByIdQuery,
} from "../services/GroupsService";

function AddMemberPage() {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const { id: groupId } = useParams();

  const { data: groupData } = useGetGroupByIdQuery(groupId, authToken);

  const {
    isLoading,
    mutate: addMember,
    error,
  } = useAddMemberMutation({
    authToken,
    groupId: groupId || "",
    onSuccess() {
      navigate(`/groups/${groupId}/members`);
    },
  });

  const mutationErrors = error ? (error as any).response.data.error : "";

  const onSubmit = (newMember: AddMemberRequest) => {
    if (!isLoading) {
      addMember({
        ...newMember,
        groupId: Number.parseInt(groupId || "-1", 10),
      });
    }
  };

  return (
    <>
      <MainAppBar
        title={groupData ? groupData.name : "Añadir miembro grupo"}
        goBackUrl={`/groups/${groupId}/members`}
      />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="sm">
          <AddMemberForm
            mutationErrors={mutationErrors}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        </Container>
      </Box>

      <GroupBottomNavigation active="spendings" groupId={groupId || ""} />
    </>
  );
}

export default AddMemberPage;
