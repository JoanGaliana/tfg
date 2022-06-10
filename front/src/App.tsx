import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import AppRoutes from "./AppRoutes";
import { AuthContextProvider } from "./contexts/AuthContext";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CssBaseline />
          <AuthContextProvider>
            <AppRoutes />
          </AuthContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
