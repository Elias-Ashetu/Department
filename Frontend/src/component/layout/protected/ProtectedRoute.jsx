
import { Navigate, Outlet } from "react-router-dom";
import { authClient } from "../../../lib/auth-client";

function ProtectedRoute() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p>Checking authentication...</p>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (session.user.role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
