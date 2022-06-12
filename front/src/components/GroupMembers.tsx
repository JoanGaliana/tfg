import { Card, CardHeader, Grid, Skeleton } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useGroupMembersQuery } from "../services/SpendingsService";
import MemberCard from "./MemberCard";

function LoadingCardSkeleton() {
  return (
    <Card>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="90%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
    </Card>
  );
}

function LoadingCardsSkeleton() {
  return (
    <Grid container spacing={2} px={4}>
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
  );
}

interface GroupMembersParams {
  groupId: string | undefined;
}

function GroupMembers({ groupId }: GroupMembersParams) {
  const { authToken } = useContext(AuthContext);

  const {
    isSuccess,
    isLoading,
    data: groupMembers,
  } = useGroupMembersQuery(groupId, authToken);

  return (
    <>
      {isLoading && <LoadingCardsSkeleton />}

      {isSuccess && (
        <Grid container spacing={1} px={4}>
          {groupMembers.map((member) => (
            <Grid key={member.id} item xs={12}>
              <MemberCard member={member} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default GroupMembers;
