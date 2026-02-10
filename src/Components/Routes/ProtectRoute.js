import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) return null;

  // ĐÃ LOGIN → không cho vào login nữa
  if (user) {
    return <Navigate to="/" replace />;
  }

  // CHƯA LOGIN → cho vào login
  return children;
};

export default PublicRoute;
