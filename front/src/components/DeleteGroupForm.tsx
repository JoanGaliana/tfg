import { LoadingButton } from "@mui/lab";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useDeleteGroupMutation } from "../services/GroupsService";

interface DeleteGroupFormParams {
  groupId: string;
}

function DeleteGroupForm({ groupId }: DeleteGroupFormParams) {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const { isLoading, mutate } = useDeleteGroupMutation({
    authToken,
    onSuccess: () => navigate("/dashboard"),
  });

  return (
    <LoadingButton
      variant="contained"
      color="error"
      fullWidth
      loading={isLoading}
      onClick={() => mutate(groupId)}
      data-cy="remove-group"
    >
      Eliminar grupo
    </LoadingButton>
  );
}

export default DeleteGroupForm;
