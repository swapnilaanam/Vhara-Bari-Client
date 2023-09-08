import useAdmin from "../../../hooks/useAdmin";
import useOwner from "../../../hooks/useOwner";
import useTenant from "../../../hooks/useTenant";
import AdminDashboard from "./AdminDashboard";
import OwnerDashboard from "./OwnerDashboard";
import TenantDashboard from "./TenantDashboard";

const Dashboard = () => {
    const [isOwner, isOwnerLoading] = useOwner();
    const [isTenant, isTenantLoading] = useTenant();
    const [isAdmin, isAdminLoading] = useAdmin();

    return (
        <div className="w-full flex justify-center">
            {
                (!isOwnerLoading && isOwner) && <OwnerDashboard />
            }
            {
                (!isTenantLoading && isTenant) && <TenantDashboard />
            }
            {
                (!isAdminLoading && isAdmin) && <AdminDashboard />
            }
        </div>
    );
};

export default Dashboard;