import { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import GroupForm from "./pages/CreateGroupPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import GroupDashboard from "./pages/GroupDashboard";
import SpendingFormPage from "./pages/SpendingFormPage";
import GroupMembersPage from "./pages/GroupMembers";

function Authenticated({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <Authenticated>
            <Dashboard />
          </Authenticated>
        }
      />
      <Route
        path="/groups/new"
        element={
          <Authenticated>
            <GroupForm />
          </Authenticated>
        }
      />
      <Route
        path="/groups/:id"
        element={
          <Authenticated>
            <GroupDashboard />
          </Authenticated>
        }
      />
      <Route
        path="/groups/:id/create-spending"
        element={
          <Authenticated>
            <SpendingFormPage />
          </Authenticated>
        }
      />
      <Route
        path="/groups/:id/members"
        element={
          <Authenticated>
            <GroupMembersPage />
          </Authenticated>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
