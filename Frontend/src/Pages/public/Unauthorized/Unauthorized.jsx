
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1>403 - Access Denied</h1>

      <p>
        You do not have permission to access this page.
      </p>

      <Link to="/">
        Return to Home
      </Link>
    </div>
  );
}

export default Unauthorized;