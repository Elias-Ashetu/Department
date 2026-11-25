
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/auth-client.js";
import "./Login.css";
import Logo from "../../../assets/images/Logo.jpeg";

function Login() {
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Currently implemented backend role
  const ADMIN_ROLE = "ADMIN";
  const ADMIN_DASHBOARD = "/admin/dashboard";

  // Handle admin login
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Step 1: Authenticate using Better Auth
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
        rememberMe,
      });

      if (result.error) {
        throw new Error(
          result.error.message || "Invalid email or password."
        );
      }

      // Step 2: Retrieve authenticated session
      const sessionResult = await authClient.getSession();

      if (sessionResult.error || !sessionResult.data?.user) {
        throw new Error("Unable to retrieve your session.");
      }

      // Step 3: Get the user's role
      const user = sessionResult.data.user;
      const role = user.role;

      // Step 4: Check admin authorization
      if (role !== ADMIN_ROLE) {
        await authClient.signOut();

        throw new Error(
          "Access denied. Only administrators can access this portal."
        );
      }

      // Step 5: Redirect admin to dashboard
      navigate(ADMIN_DASHBOARD, { replace: true });

    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-overlay"></div>

      <div className="login-modal">

        {/* LEFT BRANDING SECTION */}
        <section className="login-brand">

          <div className="university-brand">

            <img
              src={Logo}
              alt="Wollega University Logo"
              className="university-logo"
            />

            <div className="university-info-card">
              <h3>Wollega University</h3>
              <span>DEPARTMENT SELECTION SYSTEM</span>
            </div>

          </div>

          <div className="brand-message">

            <span className="brand-tagline">
              STUDENT SUCCESS STARTS HERE
            </span>

            <h1>
              One secure portal.
              <br />
              Every important
              <br />
              choice.
            </h1>

            <p>
              Access your personalized selection workspace
              and take the next step in your engineering journey.
            </p>

          </div>

          <div className="brand-footer">

            <p>
              "Education is the foundation on which we build
              our future."
            </p>

            <strong>Wollega University</strong>

          </div>

        </section>

        {/* RIGHT LOGIN SECTION */}
        <section className="login-form-panel">

          <button
            type="button"
            className="login-close"
            onClick={() => navigate("/")}
            aria-label="Close login"
          >
            ×
          </button>

          <div className="login-content">

            <div className="login-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                width="23"
                height="23"
              >
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            </div>

            <h2>Welcome back</h2>

            <p className="login-subtitle">
              Sign in to continue to your university portal.
            </p>

            <form onSubmit={handleLogin}>

              {/* EMAIL FIELD */}
              <div className="form-group">

                <label htmlFor="email">
                  University email
                </label>

                <div className="input-wrapper">

                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your university email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    required
                  />

                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="input-wrapper">

                  <svg viewBox="0 0 24 24">
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>
              </div>

              {/* REMEMBER ME AND FORGOT PASSWORD */}
              <div className="login-options">

                <label className="remember-option">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />

                  <span>Remember me</span>

                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>

              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <p className="login-error" role="alert">
                  {error}
                </p>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in to portal"}

                {!loading && <span>→</span>}
              </button>

            </form>

            {/* SECURITY MESSAGE */}
            <div className="login-security">

              <svg viewBox="0 0 24 24">
                <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>

              <span>
                Secure university authentication
              </span>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

export default Login;
