import { Navigate } from "react-router-dom";

const ProtectedResetRoute = ({ children }) => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token"); // Extract token from URL

    return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedResetRoute;
