import { Navigate } from "react-router-dom";
import { auth } from "../store/authStore";

export default function ProtectedRoute({ children }) {
  return auth.isLoggedIn() ? children : <Navigate to="/" />;
}
