import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <h2>Please log in to view your profile.</h2>;
  }

  console.log("User Profile Data:", user); // ✅ Debugging

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>First Name:</strong> {user.firstname}</p>
      <p><strong>Last Name:</strong> {user.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone Number:</strong> {user.phonenumber}</p>

      {/* Admin Dashboard Button (Only visible to admins) */}
      {user.role === "admin" && (
        <button className="admin-btn" onClick={() => navigate("/admin")}>
          Admin Dashboard
        </button>
      )}
    </div>
  );
};

export default UserProfilePage;
