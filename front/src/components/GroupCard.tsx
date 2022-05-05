import { Avatar, Card, CardHeader } from "@mui/material"
import { blue, green, orange, purple, red } from "@mui/material/colors"
import { components } from "../API_DEFS"

interface GroupCardParams {
  group: components["schemas"]["Group"]
}
const colors = [red[500], blue[500], green[500], purple[500], orange[500]]

function getRandomColor(i: number) {
  return colors[i % colors.length]
}

function GroupCard({ group }: GroupCardParams) {
  return <Card>

    <CardHeader title={group.name} subheader={group.users?.map(user => user.email).join(', ')} avatar={
      <Avatar sx={{ bgcolor: getRandomColor(group.id||1) }} aria-label="recipe">
        {group.name?.charAt(0).toUpperCase()}
      </Avatar>
    }></CardHeader>
  </Card>
}
export default GroupCard