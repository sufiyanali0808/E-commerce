import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  // ❌ Not admin (extra safety)
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // ✅ Allow access
  return children;
}