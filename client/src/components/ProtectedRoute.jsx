import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { userToken } = useContext(AppContext);

  // Redirect to home or login if no userToken
  if (!userToken) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
