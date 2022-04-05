
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';
import { loginRequest, setStoredAuthToken } from '../services/AuthService';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

type FormData = {
  email: string,
  password: string,
};

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)

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
          setHasCredentialsError(true)
        }
      }
    },
    onMutate() {
      setHasCredentialsError(false);
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [hasCredentialsError, setHasCredentialsError] = useState(false);

  const onSubmit = (data: FormData) => loginMutation.mutate(data);

  return <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Inicio de sesión
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
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
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
}

export default Login;