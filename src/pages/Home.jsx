import { useNavigate } from "react-router-dom";
import { HiOutlineLogout, HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function Home() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to log out");
    }
  }

  const displayName = currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";
  const photoURL = currentUser?.photoURL;
  const email = currentUser?.email || currentUser?.providerData?.[0]?.email || "N/A";
  const createdAt = currentUser?.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="home-page">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="home-card">
        <div className="home-header">
          <h1>
            Welcome,&nbsp;
            <span className="highlight">{displayName}</span>
          </h1>
          <button className="btn btn-logout" onClick={handleLogout}>
            <HiOutlineLogout size={20} />
            <span>Logout</span>
          </button>
        </div>

        <div className="profile-section">
          <div className="avatar-wrapper">
            {photoURL ? (
              <img src={photoURL} alt="avatar" className="avatar" />
            ) : (
              <div className="avatar avatar-placeholder">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="avatar-ring"></div>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <HiOutlineUser className="info-icon" />
              <div>
                <span className="info-label">Name</span>
                <span className="info-value">{displayName}</span>
              </div>
            </div>
            <div className="info-row">
              <HiOutlineMail className="info-icon" />
              <div>
                <span className="info-label">Email</span>
                <span className="info-value">{email}</span>
              </div>
            </div>
            <div className="info-row">
              <svg className="info-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <div>
                <span className="info-label">Member Since</span>
                <span className="info-value">{createdAt}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="home-footer">
          <p>You are securely authenticated via Firebase 🔥</p>
        </div>
      </div>
    </div>
  );
}

