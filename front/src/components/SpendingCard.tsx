import { Card, CardHeader } from "@mui/material"
import { components } from "../API_DEFS"

interface SpendingCardParams {
  spending: components["schemas"]["Spending"]
}

function SpendingCard({ spending }: SpendingCardParams) {
  return <Card data-cy="spending-card">
    <CardHeader
      title={spending.name}
      subheader={spending.amount}
    />
  </Card>
}

export default SpendingCard