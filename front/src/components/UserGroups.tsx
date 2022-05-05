import { Card, CardHeader, Grid, Skeleton } from "@mui/material"
import React, { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { useUserGroupsQuery } from "../services/GroupsService"
import GroupCard from "./GroupCard"

interface GroupCardParams {
  userId?: number
}

function UserGroups({ userId }: GroupCardParams) {
  const { authToken } = useContext(AuthContext);

  const { isSuccess, isLoading, data: groups } = useUserGroupsQuery(userId, authToken);

  return <React.Fragment>
    {isLoading && <LoadingCardsSkeleton />}

    {isSuccess && <Grid container spacing={2} px={4}>{
      groups.map((group) =>
        <Grid key={group.id} item md={6} xs={12} lg={4}>
          <GroupCard group={group}></GroupCard>
        </Grid>
      )
    }</Grid>}

  </React.Fragment>
}

function LoadingCardSkeleton() {
  return <Card>
    <CardHeader avatar={
      <Skeleton animation="wave" variant="circular" width={40} height={40} />}
      title={<Skeleton animation="wave" height={10} width="90%" style={{ marginBottom: 6 }} />}
      subheader={<Skeleton animation="wave" height={10} width="40%" />}
    />
  </Card>
}

function LoadingCardsSkeleton() {
  return <Grid container spacing={2} px={4}>
    <Grid item md={6} xs={12} lg={4}>
      <LoadingCardSkeleton />
    </Grid>
    <Grid item md={6} xs={12} lg={4}>
      <LoadingCardSkeleton />
    </Grid>
    <Grid item md={6} xs={12} lg={4}>
      <LoadingCardSkeleton />
    </Grid>
  </Grid>
}

export default UserGroups