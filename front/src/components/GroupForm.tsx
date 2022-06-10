import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Typography, Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Group } from "../services/GroupsService";

interface GroupFormParams {
  group: Group;
  onSubmit: (group: Group) => void;
  isLoading: boolean;
}

type FormData = {
  name: string;
};

function GroupForm({ group, onSubmit, isLoading }: GroupFormParams) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <Card elevation={5}>
      <CardContent>
        <Typography component="h1" variant="h5">
          Nuevo grupo
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre"
            autoFocus
            value={group.name}
            error={!!errors.name}
            helperText={errors.name && "Campo requerido"}
            {...register("name", { required: true })}
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
  );
}

export default GroupForm;
