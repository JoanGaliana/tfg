import {
  Avatar,
  Card,
  CardHeader,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { components } from "../API_DEFS";

interface SpendingCardParams {
  spending: components["schemas"]["Spending"];
}

function SpendingCard({ spending }: SpendingCardParams) {
  const userFirstLeter = (spending.user?.email || "?")[0].toUpperCase();
  const theme = useTheme();

  return (
    <Card data-cy="spending-card" data-cy-name={spending.name}>
      <CardHeader
        avatar={<Avatar>{userFirstLeter}</Avatar>}
        title={
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>{spending.name}</Grid>
            <Grid item>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                }}
              >
                {spending.amount} €
              </Typography>
            </Grid>
          </Grid>
        }
        subheader={spending.user?.email || "Unkwnown"}
      />
    </Card>
  );
}

export default SpendingCard;
