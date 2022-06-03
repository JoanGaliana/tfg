import axios from "axios"
import {  useQuery } from "react-query";
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