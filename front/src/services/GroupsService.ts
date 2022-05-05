import axios from "axios"
import { useQuery } from "react-query";
import { operations } from '../API_DEFS';
import { getAuthenticationHeaders } from "./AuthService";

type getUserGroupsResponse = operations['getUserGroups']["responses"]["200"]["content"]["*/*"];


export function useUserGroupsQuery(userId: number | undefined, authToken: string) {
  const headers = getAuthenticationHeaders(authToken);

  return useQuery(
    ['userGroups', userId],
    ({ signal }) => axios.get<getUserGroupsResponse>(`http://localhost:8080/users/${userId}/groups`, { signal, headers }),
    {
      enabled: userId !== undefined,
      select: (response) => response.data,
    }
  )

}