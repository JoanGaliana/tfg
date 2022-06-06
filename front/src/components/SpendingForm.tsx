import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Typography, Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "react-hook-form";
import { CreateNewSpendingRequest, Spending } from "../services/SpendingsService";
import { User } from "../services/UsersService";

interface SpendingFormParams {
  spending: Spending;
  onSubmit: (spending: CreateNewSpendingRequest) => void;
  isLoading: boolean;
  groupUsers: User[] | undefined;
}

type FormData = {
  name: string;
  amount: number;
  userEmail: string;
};

function SpendingForm({ spending, onSubmit, isLoading, groupUsers }: SpendingFormParams) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onFormSubmit = ({ name, amount, userEmail }: FormData) => {
    let userId: number = -1;

    if (groupUsers) {
      userId = groupUsers.find((u => u.email === userEmail))?.id || -1
    }

    const spending: CreateNewSpendingRequest = {
      name: name,
      amount: amount,
      userId,
    }

    return onSubmit(spending);
  }

  return <Card elevation={5}>
    <CardContent>
      <Typography component="h1" variant="h5">
        Crear nuevo gasto
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onFormSubmit)} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Asunto"
          autoFocus
          value={spending.name}

          error={!!errors.name}
          helperText={errors.name && "Campo requerido"}
          {...register("name", { required: true })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="amount"
          label="Cantidad"
          value={spending.amount}
          type="number"

          error={!!errors.amount}
          helperText={errors.amount && "Campo requerido"}
          {...register("amount", { required: true, min: 0, valueAsNumber: true })}
        />
        <Autocomplete
          disablePortal
          id="userEmail"
          options={groupUsers || []}
          disableClearable
          autoHighlight
          getOptionLabel={(user) => String(user.email)}
          renderInput={(params) =>
            <TextField
              required
              {...register("userEmail", { required: true })}
              {...params}
              error={!!errors.userEmail}
              helperText={errors.userEmail && "Campo requerido"}
              label="Realizó el gasto" />
          }
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          Crear
        </LoadingButton>
      </Box>
    </CardContent>
  </Card>
}

export default SpendingForm;