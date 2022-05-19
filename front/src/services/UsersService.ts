import axios from "axios"
import { useQuery } from "react-query";
import { operations, components } from '../API_DEFS';
import { getAuthenticationHeaders } from "./AuthService";
import { API_URL } from "./ConfigService";

export type User = components["schemas"]["User"];

type getUserGroupsResponse = operations['getCurrentUser']["responses"]["200"]["content"]["*/*"];

export function useCurrentUserQuery(authToken: string) {
  const headers = getAuthenticationHeaders(authToken);

  return useQuery(
    ['currentUser'],
    ({ signal }) => axios.get<getUserGroupsResponse>(`${API_URL}/users/current`, { signal, headers }),
    {
      cacheTime: 1000 * 60 * 5,
      select: (response) => response.data
    }
  )
}