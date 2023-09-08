import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();

    if (isAdminLoading) {
        return (
            <div className="absolute left-0 w-full min-h-screen flex justify-center items-center bg-black" style={{ zIndex: "599" }}>
                <span className="loading loading-infinity loading-lg text-white"></span>
            </div>
        )
    }

    if (isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={location} replace />
};

export default AdminRoute;