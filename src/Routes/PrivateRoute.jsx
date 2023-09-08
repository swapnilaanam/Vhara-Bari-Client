import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    const location = useLocation();

    if (loading) {
        return (
            <div className="absolute left-0 w-full min-h-screen flex justify-center items-center bg-black" style={{ zIndex: "599" }}>
                <span className="loading loading-infinity loading-lg text-white"></span>
            </div>
        )
    }

    if (user) {
        return children;
    }

    return <Navigate state={{ from: location }} to="/login" replace />
};

export default PrivateRoute;