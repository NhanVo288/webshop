import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) return null;

  
  if (!user) {
    return <Navigate to="/" replace />;
  }

  
  return children;
};

export default PublicRoute;
