import { useContext, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import UserRegistrationForm, {
  UserRegistrationFormData,
} from "../components/RegisterForm";
import { createUser } from "../services/UsersService";

type FormData = UserRegistrationFormData;

function UserRegistrationPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess(data) {
      const authToken = data.data;

      login(authToken);

      navigate("/dashboard");
    },
    onError(error) {
      if (axios.isAxiosError(error) && error.response) {
        const responseCode = error.response?.status;
        const responseBody = error.response?.data;

        if (
          responseCode === 400 &&
          responseBody &&
          responseBody.error &&
          responseBody.error === "USERNAME_ALREADY_EXISTS"
        ) {
          setIsEmailDuplicated(true);
        }
      }
    },
    onMutate() {
      setIsEmailDuplicated(false);
    },
  });

  const onSubmit = (data: FormData) => mutate(data);

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
        <UserRegistrationForm
          isLoading={isLoading}
          isEmailDuplicated={isEmailDuplicated}
          onSubmit={onSubmit}
        />
      </Container>
    </Box>
  );
}

export default UserRegistrationPage;
