import axios from 'axios';
import { operations } from '../API_DEFS';

type loginResponse = operations['loginByPassword']["responses"]["200"]["content"]["*/*"];
type LoginRequestParameters = operations['loginByPassword']["requestBody"]["content"]["application/json"];

export function loginRequest(payload: LoginRequestParameters) {
  return axios.post<loginResponse>('http://localhost:8080/login', payload)
}

const AUTH_TOKEN_KEY = "authToken"

export function getStoredAuthToken(): string {
  return localStorage.getItem(AUTH_TOKEN_KEY) || "";
}

export function setStoredAuthToken(authToken: string) {
  return localStorage.setItem(AUTH_TOKEN_KEY, authToken);
}

export function clearStoredAuthToken() {
  setStoredAuthToken("");
}

export function getAuthenticationHeaders(authToken: string) {
  return {
    'Authorization': `Bearer ${authToken}`
  }
}