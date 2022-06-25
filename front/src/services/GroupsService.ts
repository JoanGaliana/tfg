import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { components, operations } from "../API_DEFS";
import { getAuthenticationHeaders } from "./AuthService";
import { API_URL } from "./ConfigService";

export type Group = components["schemas"]["Group"];

type GetUserGroupsResponse =
  operations["getUserGroups"]["responses"]["200"]["content"]["*/*"];

export function useUserGroupsQuery(
  userId: number | undefined,
  authToken: string
) {
  const headers = getAuthenticationHeaders(authToken);

  return useQuery(
    ["userGroups", userId],
    ({ signal }) =>
      axios.get<GetUserGroupsResponse>(`${API_URL}/users/${userId}/groups`, {
        signal,
        headers,
      }),
    {
      enabled: userId !== undefined,
      select: (response) => response.data,
    }
  );
}

type CreateNewGroupRequest =
  operations["createNewGroup"]["requestBody"]["content"]["application/json"];
type CreateNewGroupResponse =
  operations["createNewGroup"]["responses"]["201"]["content"]["*/*"];

export type CreateGroupData = CreateNewGroupRequest;
interface UseCreateGroupMutationParams {
  onSuccess?: (response: AxiosResponse<CreateNewGroupResponse, any>) => any;
  authToken: string;
}

export function useCreateGroupMutation({
  onSuccess,
  authToken,
}: UseCreateGroupMutationParams) {
  const headers = getAuthenticationHeaders(authToken);

  return useMutation(
    (data: CreateNewGroupRequest) =>
      axios.post<CreateNewGroupResponse>(`${API_URL}/groups`, data, {
        headers,
      }),
    { onSuccess }
  );
}

type GetGroupByIdResponse =
  operations["getGroupById"]["responses"]["200"]["content"]["*/*"];

export function useGetGroupByIdQuery(
  id: string | undefined,
  authToken: string
) {
  const headers = getAuthenticationHeaders(authToken);

  return useQuery(
    ["groups", id],
    ({ signal }) =>
      axios.get<GetGroupByIdResponse>(`${API_URL}/groups/${id}`, {
        signal,
        headers,
      }),
    {
      enabled: !!id,
      select: (response) => response.data,
    }
  );
}
