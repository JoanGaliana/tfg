import { Avatar, Card, CardHeader, Typography, useTheme } from "@mui/material";
import { components } from "../API_DEFS";

interface MemberCardParams {
  member: components["schemas"]["Member"];
}

function MemberCard({ member }: MemberCardParams) {
  const userFirstLeter = member.email[0].toUpperCase();
  const theme = useTheme();

  return (
    <Card data-cy="member-card" data-cy-name={member.email}>
      <CardHeader
        avatar={<Avatar>{userFirstLeter}</Avatar>}
        title={member.email}
        subheader={
          <Typography
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            {member.totalSpent} €
          </Typography>
        }
      />
    </Card>
  );
}

export default MemberCard;
