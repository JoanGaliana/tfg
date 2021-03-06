import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Container, Link } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/AuthService";
import { AuthContext } from "../contexts/AuthContext";

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [hasCredentialsError, setHasCredentialsError] = useState(false);

  const loginMutation = useMutation(loginRequest, {
    onSuccess(data) {
      const authToken = data.data;

      login(authToken);

      navigate("/dashboard");
    },
    onError(error) {
      if (axios.isAxiosError(error) && error.response) {
        const responseCode = error.response?.status;

        if (responseCode === 401) {
          setHasCredentialsError(true);
        }
      }
    },
    onMutate() {
      setHasCredentialsError(false);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => loginMutation.mutate(data);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container component="main" maxWidth="sm">
        <Card elevation={5}>
          <CardContent>
            <Typography component="h1" variant="h5">
              Inicio de sesión
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
                id="email"
                label="Correo electrónico"
                autoComplete="email"
                autoFocus
                error={!!errors.email || hasCredentialsError}
                helperText={errors.email && "Campo requerido"}
                {...register("email", { required: true })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password || hasCredentialsError}
                helperText={errors.password && "Campo requerido"}
                {...register("password", { required: true })}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loginMutation.isLoading}
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    ¿No tienes una cuenta? Registrate
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
