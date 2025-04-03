import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <p>Loading...</p>;

  return user && user.role === "finance" ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
