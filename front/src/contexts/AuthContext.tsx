import { createContext, useMemo, useState } from "react";
import { getStoredAuthToken, setStoredAuthToken } from '../services/AuthService';

interface IAuthContext {
  authToken: string,
  isAuthenticated: boolean,
  login: (authToken: string) => void,
  logout: () => void,
}

export const AuthContext = createContext<IAuthContext>({
  authToken: '',
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
})

export function AuthContextProvider({ children }: { children: JSX.Element }) {
  const [authToken, setAuthToken] = useState<string>(getStoredAuthToken())
  
  const value = useMemo(() => ({
    isAuthenticated: !!authToken,
    authToken,
    login(newAuthToken: string) {
      setAuthToken(newAuthToken);
      setStoredAuthToken(newAuthToken);
    },
    logout(){
      setAuthToken("");
      setStoredAuthToken("");
    }
  }), [authToken])

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}

