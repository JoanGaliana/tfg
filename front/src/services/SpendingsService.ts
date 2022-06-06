import axios, { AxiosResponse } from "axios"
import { useMutation, useQuery } from "react-query";
import { components, operations } from '../API_DEFS';
import { getAuthenticationHeaders } from "./AuthService";
import { API_URL } from "./ConfigService";

export type Spending = components['schemas']['Spending']

type getGroupSpendingsResponse = operations['getGroupSpendings']["responses"]["200"]["content"]["*/*"];

export function useGroupSpendingsQuery(groupId: string | undefined, authToken: string) {
  const headers = getAuthenticationHeaders(authToken);

  return useQuery(
    ['groupSpendings', groupId],
    ({ signal }) => axios.get<getGroupSpendingsResponse>(`${API_URL}/groups/${groupId}/spendings`, { signal, headers }),
    {
      enabled: groupId !== undefined,
      select: (response) => response.data,
    }
  )
}

export type CreateNewSpendingRequest = operations['createNewSpending']["requestBody"]["content"]["application/json"];
type CreateNewSpendingResponse = operations['createNewSpending']["responses"]["200"]["content"]["*/*"];

interface UseCreateSpendingMutationParams {
  onSuccess?: (response: AxiosResponse<CreateNewSpendingResponse, any>) => any;
  authToken: string;
  groupId: string;
}

export function useCreateSpendingMutation({ onSuccess, authToken }: UseCreateSpendingMutationParams) {
  const headers = getAuthenticationHeaders(authToken);

  return useMutation(
    (data: CreateNewSpendingRequest) => axios.post<CreateNewSpendingResponse>(`${API_URL}/groups/${data.groupId}/spendings`, data, { headers }),
    { onSuccess }
  )
}
