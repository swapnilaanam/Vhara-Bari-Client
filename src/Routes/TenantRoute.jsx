import { Navigate, useLocation } from "react-router-dom";
import useTenant from "../hooks/useTenant";

const TenantRoute = ({ children }) => {
    const [isTenant, isTenantLoading] = useTenant();

    const location = useLocation();

    if (isTenantLoading) {
        return (
            <div className="absolute left-0 w-full min-h-screen flex justify-center items-center bg-black" style={{ zIndex: "599" }}>
                <span className="loading loading-infinity loading-lg text-white"></span>
            </div>
        )
    }

    if (isTenant) {
        return children;
    }

    return <Navigate to="/login" state={location} replace />
};

export default TenantRoute;