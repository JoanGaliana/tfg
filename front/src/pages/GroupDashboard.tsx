import { Box } from "@mui/material"
import React, { useContext } from "react"
import MainAppBar from "../components/MainAppBar";
import UserGroups from "../components/UserGroups";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from 'react-router-dom';
import { useGetGroupByIdQuery } from "../services/GroupsService";

const fabStyles = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem'
}

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
      {JSON.stringify({ data })}
    </Box>
  </React.Fragment>
}

export default GroupDashboard