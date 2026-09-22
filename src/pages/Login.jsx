import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaUser } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";

import googleIcon from "../assets/google.png";
import { auth, googleProvider } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  // =========================
  // GUEST LOGIN
  // =========================
  const handleGuestLogin = () => {
    localStorage.setItem("user", "guest@summarist.com");
    navigate("/for-you");
  };

  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      console.log("Google user:", user);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.displayName || "",
          email: user.email || "",
          photo: user.photoURL || "",
        })
      );

      navigate("/for-you");
    } catch (error) {
      console.error("Google login error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      alert(
        `Google Login Error\n\nCode: ${
          error.code || "unknown"
        }\n\nMessage: ${error.message || "Unknown error"}`
      );
    }
  };

  // =========================
  // EMAIL LOGIN
  // =========================
  const handleLogin = (event) => {
    event.preventDefault();

    localStorage.setItem("user", "user@summarist.com");
    navigate("/for-you");
  };

  // =========================
  // CLOSE LOGIN
  // =========================
  const handleClose = () => {
    navigate("/");
  };

  return (
    <main className="login-overlay">
      <div className="login-modal">

        {/* Close Button */}
        <button
          type="button"
          className="login-close"
          onClick={handleClose}
          aria-label="Close login"
        >
          <FaTimes />
        </button>

        {/* Title */}
        <h1>Log in to Summarist</h1>

        {/* Guest Login */}
        <button
          type="button"
          className="login-guest-button"
          onClick={handleGuestLogin}
        >
          <FaUser />
          <span>Login as a Guest</span>
        </button>

        {/* Divider */}
        <div className="login-divider">
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="login-google-button"
          onClick={handleGoogleLogin}
        >
          <span className="google-icon-wrapper">
            <img
              src={googleIcon}
              alt="Google"
            />
          </span>

          <span>Login with Google</span>
        </button>

        {/* Divider */}
        <div className="login-divider">
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        {/* Email Login */}
        <form
          onSubmit={handleLogin}
          className="login-form"
        >
          <input
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            required
          />

          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            required
          />

          <button
            type="submit"
            className="login-submit-button"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <button
          type="button"
          className="forgot-password"
        >
          Forgot your password?
        </button>

        {/* Register */}
        <div className="login-register-section">
          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create an account
          </Link>
        </div>

      </div>
    </main>
  );
};

export default Login;