import { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import GroupForm from "./pages/CreateGroupPage";
import Login from "./pages/Login";
import GroupDashboard from "./pages/GroupDashboard";
import SpendingFormPage from "./pages/SpendingFormPage";
import GroupMembersPage from "./pages/GroupMembers";
import AddMemberPage from "./pages/AddMemberPage";
import UserRegistrationPage from "./pages/Register";
import GroupConfigurationPage from "./pages/GroupConfigurationPage";

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
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<UserRegistrationPage />} />

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
      <Route
        path="/groups/:id/add-member"
        element={
          <Authenticated>
            <AddMemberPage />
          </Authenticated>
        }
      />
      <Route
        path="/groups/:id/configuration"
        element={
          <Authenticated>
            <GroupConfigurationPage />
          </Authenticated>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
