import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTenant = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: isTenant, isLoading: isTenantLoading } = useQuery({
        queryKey: ['isTenant', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/tenant/${user?.email}`);
            return response.data.tenant;
        }
    });

    return [isTenant, isTenantLoading];
};

export default useTenant;