import { Box, Divider, Typography } from "@mui/material"
import React, { useContext } from "react"
import MainAppBar from "../components/MainAppBar";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useGetGroupByIdQuery } from "../services/GroupsService";
import { GroupBottomNavigation } from "../components/GroupBottomNavigation";


function GroupDashboard() {
  const { authToken } = useContext(AuthContext)

  let { id } = useParams();

  const { data } = useGetGroupByIdQuery(id, authToken)

  const title = data?.name || "Grupo";
  const goBackUrl = "/dashboard";

  return <React.Fragment>
    <MainAppBar title={title} goBackUrl={goBackUrl} />
    <Box
      component="main"
      sx={{
        mt: '5rem',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Box sx={{
        mx: '5rem',
        my: '1rem',
        mb: '1.5rem',
      }}>
        <Typography variant="h5" gutterBottom component="div">
          Gastos
        </Typography>
      </Box>

      <Divider />
      <GroupBottomNavigation active="spendings" groupId={id || ''}></GroupBottomNavigation>
    </Box>
  </React.Fragment>
}

export default GroupDashboard