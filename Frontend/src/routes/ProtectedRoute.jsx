
import { Navigate, Outlet } from "react-router-dom";
import { authClient } from "../lib/auth-client.js";

function ProtectedRoute({ allowedRoles = [] }) {
  // Get authenticated session
  const { data: session, isPending } = authClient.useSession();

  //  Check authentication loading
  if (isPending) {
    return <p>Checking authentication...</p>;
  }

  //  Check whether user is logged in
  if (!session?.user) {
    return <Navigate to="/login" replace />;
  }

  //  Get authenticated user's role
  const userRole = session.user.role;

  //  Check whether the user's role is allowed
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  //  Allow access to the requested page
  return <Outlet />;
}

export default ProtectedRoute;
