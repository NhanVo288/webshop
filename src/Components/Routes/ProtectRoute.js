import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { user, isCheckingAuth } = useSelector((state) => state.auth);

  if (isCheckingAuth) return null;

  // ĐÃ LOGIN → không cho vào login nữa
  if (user) {
    return <Navigate to="/" replace />;
  }

  // CHƯA LOGIN → cho vào login
  return children;
};

export default PublicRoute;
