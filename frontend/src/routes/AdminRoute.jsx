import { Navigate } from "react-router-dom";
import { auth } from "../store/authStore";

export default function AdminRoute({ children }) {
  return auth.isLoggedIn() && auth.isAdmin()
    ? children
    : <Navigate to="/" />;
}
