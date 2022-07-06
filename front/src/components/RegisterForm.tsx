import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CreateUserRequest } from "../services/UsersService";

interface SpendingFormParams {
  onSubmit: (data: CreateUserRequest) => void;
  isEmailDuplicated: boolean;
  isLoading: boolean;
}

export type UserRegistrationFormData = CreateUserRequest;

function UserRegistrationForm({
  onSubmit,
  isEmailDuplicated,
  isLoading,
}: SpendingFormParams) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<UserRegistrationFormData>();

  const submitForm = handleSubmit((data) => {
    onSubmit(data);
    reset(data);
  });

  const hasDuplicatedEmailError = !touchedFields.email && isEmailDuplicated;
  return (
    <Card elevation={5}>
      <CardContent>
        <Typography component="h1" variant="h5">
          Registro de nueva cuenta de usuario
        </Typography>
        <Box component="form" noValidate onSubmit={submitForm} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            autoComplete="email"
            autoFocus
            error={!!errors.email || hasDuplicatedEmailError}
            helperText={
              (errors.email && "Campo requerido") ||
              (hasDuplicatedEmailError && "Email ya existente")
            }
            {...register("email", { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Contraseña"
            type="password"
            id="password"
            error={!!errors.password}
            helperText={errors.password && "Campo requerido"}
            {...register("password", { required: true })}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Crear cuenta
          </LoadingButton>

          <Link href="/login" variant="body2">
            ¿Ya tienes una cuenta? Ir a inicio de sesión
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserRegistrationForm;
