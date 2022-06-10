import { Card, CardHeader, Grid, Skeleton } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useGroupSpendingsQuery } from "../services/SpendingsService";
import SpendingCard from "./SpendingCard";

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

interface GroupCardParams {
  groupId: string | undefined;
}

function GroupSpendings({ groupId }: GroupCardParams) {
  const { authToken } = useContext(AuthContext);

  const {
    isSuccess,
    isLoading,
    data: spendings,
  } = useGroupSpendingsQuery(groupId, authToken);

  return (
    <>
      {isLoading && <LoadingCardsSkeleton />}

      {isSuccess && (
        <Grid container spacing={1} px={4}>
          {spendings.map((spending) => (
            <Grid key={spending.id} item xs={12}>
              <SpendingCard spending={spending} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default GroupSpendings;
