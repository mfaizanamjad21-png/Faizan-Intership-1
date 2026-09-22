import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

import googleIcon from "../assets/google.png";
import { auth, googleProvider } from "../firebase";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // EMAIL SIGN UP
  // =========================
  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = result.user;

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.displayName || "",
          email: user.email,
          photo: user.photoURL || "",
        })
      );

      navigate("/for-you");
    } catch (error) {
      console.error("Registration error:", error);

      switch (error.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;

        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;

        default:
          setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE SIGN UP
  // =========================
  const handleGoogleSignup = async () => {
    setError("");

    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      const user = result.user;

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
      console.error("Google signup error:", error);
      setError(
        error.message || "Google signup failed. Please try again."
      );
    }
  };

  // =========================
  // CLOSE
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
          aria-label="Close signup"
        >
          <FaTimes />
        </button>

        {/* Title */}
        <h1>Sign up to Summarist</h1>

        {/* Error */}
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {/* Google Signup */}
        <button
          type="button"
          className="login-google-button"
          onClick={handleGoogleSignup}
          disabled={loading}
        >
          <span className="google-icon-wrapper">
            <img
              src={googleIcon}
              alt="Google"
            />
          </span>

          <span>Sign up with Google</span>
        </button>

        {/* Divider */}
        <div className="login-divider">
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        {/* Email Signup */}
        <form
          onSubmit={handleRegister}
          className="login-form"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button
            type="submit"
            className="login-submit-button"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        {/* Login */}
        <div className="login-register-section">
          <Link to="/login">
            Already have an account?
          </Link>
        </div>

      </div>
    </main>
  );
};

export default Register;