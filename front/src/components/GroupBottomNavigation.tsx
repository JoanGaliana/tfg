
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import AccountsBalanceIcon from '@mui/icons-material/AccountBalance'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from "react-router-dom"

interface GroupBottomNavigationArgs {
  groupId: string
  active: "spendings" | "members" | "configuration"
}

const activeIndex = { "spendings": 0, "members": 1, "configuration": 2 }

export function GroupBottomNavigation({ active, groupId }: GroupBottomNavigationArgs) {
  const navigate = useNavigate()
  const navigateToSubpath = (subPath: string) => {
    navigate(`/groups/${groupId}/${subPath}`)
  }

  return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation
      showLabels
      value={activeIndex[active]}
    >
      <BottomNavigationAction label="Gastos" icon={<AccountsBalanceIcon />} onClick={() => navigateToSubpath('')} />
      <BottomNavigationAction label="Miembros" icon={<PeopleIcon />} onClick={() => navigateToSubpath('members')} />
      <BottomNavigationAction label="Configuración" icon={<SettingsIcon onClick={() => navigateToSubpath('configuration')} />} />
    </BottomNavigation>
  </Paper>
}