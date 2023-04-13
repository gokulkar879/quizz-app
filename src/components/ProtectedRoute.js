import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ userId, children }) => {
    if (userId) {
        return children;
    }
    return <Navigate to="/" replace />;
};
export default ProtectedRoute;