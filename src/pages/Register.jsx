import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";
import googleLogo from "../assets/google.png";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearError = () => {
    if (error) {
      setError("");
    }
  };

  const saveUserAndContinue = (user) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: user.displayName || "",
        email: user.email || "",
        photo: user.photoURL || "",
      })
    );

    navigate("/for-you");
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      saveUserAndContinue(result.user);
    } catch (error) {
      console.error("Firebase registration error:", error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please log in.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;

        case "auth/operation-not-allowed":
          setError(
            "Email/password registration is not enabled in Firebase."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        default:
          setError(
            `Registration failed: ${
              error.message || "Please try again."
            }`
          );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      saveUserAndContinue(result.user);
    } catch (error) {
      console.error("Google registration error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        setError("Google sign up was cancelled.");
      } else if (error.code === "auth/popup-blocked") {
        setError("Please allow pop-ups and try again.");
      } else {
        setError(
          `Google sign up failed: ${
            error.message || "Please try again."
          }`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-overlay">
      <div className="login-modal">
        <button
          type="button"
          className="login-close"
          onClick={() => navigate("/")}
          aria-label="Close registration"
        >
          <FaTimes />
        </button>

        <h1>Create an account</h1>

        {error && <div className="login-error">{error}</div>}

        <button
          type="button"
          className="google-login-button"
          onClick={handleGoogleSignUp}
          disabled={loading}
        >
          <img src={googleLogo} alt="Google" />
          <span>Sign up with Google</span>
        </button>

        <div className="login-divider">
          <span>or</span>
        </div>

        <form onSubmit={handleRegister} className="login-form">
          <input
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearError();
            }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              clearError();
            }}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              clearError();
            }}
            required
          />

          <button
            type="submit"
            className="login-submit-button"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="login-register-section">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </main>
  );
};

export default Register;