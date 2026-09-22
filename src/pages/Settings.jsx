import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaHome,
  FaBookmark,
  FaPen,
  FaSearch,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  let email = "user@summarist.com";

  try {
    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (typeof user === "string") {
        email = user;
      } else if (user.email) {
        email = user.email;
      }
    }
  } catch {
    email = storedUser || "user@summarist.com";
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="settings-layout">

      {/* =========================
          SIDEBAR
      ========================= */}
      <aside className="summarist-sidebar">

        {/* Logo */}
        <div className="sidebar-logo">
          <FaBookOpen className="sidebar-logo-icon" />
          <span>Summarist</span>
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-main-nav">

          <button
            type="button"
            onClick={() => navigate("/for-you")}
          >
            <FaHome />
            <span>For you</span>
          </button>

          <button type="button">
            <FaBookmark />
            <span>My Library</span>
          </button>

          <button type="button">
            <FaPen />
            <span>Highlights</span>
          </button>

          <button type="button">
            <FaSearch />
            <span>Search</span>
          </button>

        </nav>

        {/* Bottom Navigation */}
        <nav className="sidebar-bottom-nav">

          <button
            type="button"
            className="sidebar-active"
          >
            <FaCog />
            <span>Settings</span>
          </button>

          <button type="button">
            <FaQuestionCircle />
            <span>Help &amp; Support</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </nav>

      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main className="settings-content">

        <div className="settings-container">

          {/* Page title */}
          <div className="settings-title">
            <h1>Settings</h1>
          </div>

          {/* Subscription */}
          <section className="settings-section">

            <h2>Your Subscription plan</h2>

            <p className="settings-value">
              Basic
            </p>

            <button
              type="button"
              className="upgrade-button"
              onClick={() => navigate("/choose-plan")}
            >
              Upgrade to Premium
            </button>

          </section>

          {/* Email */}
          <section className="settings-section email-section">

            <h2>Email</h2>

            <p className="settings-email">
              {email}
            </p>

          </section>

        </div>

      </main>

    </div>
  );
};

export default Settings;