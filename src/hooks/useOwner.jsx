import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useOwner = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: isOwner, isLoading: isOwnerLoading } = useQuery({
        queryKey: ['isOwner', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/owner/${user?.email}`);
            return response.data.owner;
        }
    });

    return [isOwner, isOwnerLoading];
};

export default useOwner;