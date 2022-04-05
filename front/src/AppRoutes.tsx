import { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";


function Authenticated({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />

    <Route path="/dashboard" element={<Authenticated><Dashboard /></Authenticated>} ></Route>
  </Routes>
}

export default AppRoutes;