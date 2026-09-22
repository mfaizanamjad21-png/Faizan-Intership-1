import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaBookmark,
  FaHighlighter,
  FaSearch,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("subscription");
    navigate("/");
  };

  return (
    <aside className="summarist-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">S</span>
        <span>Summarist</span>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-main-nav">
        <button
          type="button"
          className={isActive("/for-you") ? "sidebar-active" : ""}
          onClick={() => handleNavigate("/for-you")}
        >
          <FaBookOpen />
          <span>For You</span>
        </button>

        <button
          type="button"
          className={isActive("/library") ? "sidebar-active" : ""}
          onClick={() => handleNavigate("/library")}
        >
          <FaBookmark />
          <span>My Library</span>
        </button>

        <button
          type="button"
          className={isActive("/highlights") ? "sidebar-active" : ""}
          onClick={() => handleNavigate("/highlights")}
        >
          <FaHighlighter />
          <span>Highlights</span>
        </button>

        <button
          type="button"
          className={isActive("/search") ? "sidebar-active" : ""}
          onClick={() => handleNavigate("/search")}
        >
          <FaSearch />
          <span>Search</span>
        </button>
      </nav>

      {/* Bottom Navigation */}
      <nav className="sidebar-bottom-nav">
        <button
          type="button"
          className={isActive("/settings") ? "sidebar-active" : ""}
          onClick={() => handleNavigate("/settings")}
        >
          <FaCog />
          <span>Settings</span>
        </button>

        <button
          type="button"
          className={isActive("/help") ? "sidebar-active" : ""}
          onClick={() => handleNavigate("/help")}
        >
          <FaQuestionCircle />
          <span>Help & Support</span>
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
  );
};

export default Sidebar;