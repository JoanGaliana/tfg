import { Avatar, Card, CardHeader, IconButton } from "@mui/material"
import { blue, green, orange, purple, red } from "@mui/material/colors"
import { components } from "../API_DEFS"
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useNavigate } from "react-router-dom"

interface GroupCardParams {
  group: components["schemas"]["Group"]
}
const colors = [red[500], blue[500], green[500], purple[500], orange[500]]

function getRandomColor(i: number) {
  return colors[i % colors.length]
}

function GroupCard({ group }: GroupCardParams) {
  const navigate = useNavigate()
  const navigateToGroup = () => navigate(`/groups/${group.id}`)

  return <Card onClick={navigateToGroup} data-cy={`group-card`}>
    <CardHeader
      title={group.name}
      subheader={group.users?.map(user => user.email).join(', ')}
      avatar={
        <Avatar sx={{ bgcolor: getRandomColor(group.id || 1) }} aria-label="recipe">
          {group.name?.charAt(0).toUpperCase()}
        </Avatar>
      }
      action={
        <IconButton><ChevronRightIcon></ChevronRightIcon></IconButton>
      }
    />
  </Card>
}
export default GroupCard