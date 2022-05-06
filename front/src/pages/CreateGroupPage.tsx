import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupForm from '../components/GroupForm';
import { AuthContext } from '../contexts/AuthContext';
import { Group, useCreateGroupMutation } from '../services/GroupsService';

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
  }

  return <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Container component="main" maxWidth="sm">
      <GroupForm group={{}} isLoading={isLoading} onSubmit={onSubmit}></GroupForm>
    </Container>
  </Box>
}

export default CreateGroupPage;