import { Navigate, useLocation } from "react-router-dom";
import useOwner from "../hooks/useOwner";

const OwnerRoute = ({ children }) => {
    const [ isOwner, isOwnerLoading ] = useOwner();

    console.log(isOwner);

    const location = useLocation();

    if (isOwnerLoading) {
        return (
            <div className="absolute left-0 w-full min-h-screen flex justify-center items-center bg-black" style={{ zIndex: "599" }}>
                <span className="loading loading-infinity loading-lg text-white"></span>
            </div>
        )
    }

    if (isOwner) {
        return children;
    }

    return <Navigate to="/login" state={location} replace />
};

export default OwnerRoute;