import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupBottomNavigation } from '../components/GroupBottomNavigation';
import MainAppBar from '../components/MainAppBar';
import SpendingForm from '../components/SpendingForm';
import { AuthContext } from '../contexts/AuthContext';
import { useGetGroupByIdQuery } from '../services/GroupsService';
import { CreateNewSpendingRequest, useCreateSpendingMutation } from '../services/SpendingsService';

function SpendingFormPage() {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  let { id: groupId } = useParams();

  const { data } = useGetGroupByIdQuery(groupId, authToken)

  const { isLoading, mutate: createSpending } = useCreateSpendingMutation({
    authToken,
    groupId: groupId || "",
    onSuccess() {
      navigate(`/groups/${groupId}`);
    },
  });

  const onSubmit = (newSpending: CreateNewSpendingRequest) => {
    if (!isLoading) {
      createSpending({ ...newSpending, groupId: Number.parseInt(groupId || "-1") });
    }
  }

  return <React.Fragment>
    <MainAppBar title="Crear gasto" goBackUrl={`/groups/${groupId}`} />

    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container component="main" maxWidth="sm">
        <SpendingForm
          spending={{}}
          groupUsers={data?.users}
          isLoading={isLoading}
          onSubmit={onSubmit} />
      </Container>
    </Box>

    <GroupBottomNavigation active="spendings" groupId={groupId || ''}></GroupBottomNavigation>
  </React.Fragment>
}

export default SpendingFormPage;