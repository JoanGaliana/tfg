import { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import GroupForm from "./pages/CreateGroupPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import GroupDashboard from "./pages/GroupDashboard";


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
    <Route path="/groups/new" element={<Authenticated><GroupForm /></Authenticated>} ></Route>
    <Route path="/groups/:id" element={<Authenticated><GroupDashboard /></Authenticated>} ></Route>
  </Routes>
}

export default AppRoutes;