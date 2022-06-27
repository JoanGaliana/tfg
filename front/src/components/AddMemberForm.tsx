import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Typography, Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { AddMemberRequest } from "../services/GroupsService";

interface AddMemberFormParams {
  onSubmit: (data: AddMemberRequest) => void;
  isLoading: boolean;
  mutationErrors: "USER_NOT_FOUND" | "";
}

type FormData = {
  email: string;
};

function AddMemberForm({
  isLoading,
  onSubmit,
  mutationErrors,
}: AddMemberFormParams) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormData>();

  return (
    <Card elevation={5}>
      <CardContent>
        <Typography component="h1" variant="h5">
          Añadir nuevo miembro
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit((data) => onSubmit(data))}
          sx={{ mt: 1 }}
        >
          <TextField
            required
            {...register("email", { required: true })}
            error={!!formErrors.email || mutationErrors === "USER_NOT_FOUND"}
            helperText={
              (formErrors.email && "Campo requerido") ||
              (mutationErrors === "USER_NOT_FOUND" && "Usuario no encontrado")
            }
            fullWidth
            label="Email"
            id="email"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Añadir miembro
          </LoadingButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AddMemberForm;
