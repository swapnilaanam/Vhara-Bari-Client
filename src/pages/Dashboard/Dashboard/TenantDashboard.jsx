import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TenantDashboard = () => {
    const { user } = useAuth();

    const [axiosSecure] = useAxiosSecure();

    const { data: rentedHouses = [] } = useQuery({
        queryKey: ['rentedHouses', user?.email],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/rentedhouses/${user?.email}`);
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    });

    const { data: totalSum = 0 } = useQuery({
        queryKey: ['totalSum', user?.email],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/payments/${user?.email}`);
                const sum = response?.data?.reduce((total, current) => total + current?.price, 0);
                // console.log(sum);
                return sum;
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <div className="w-full flex justify-center px-4 lg:px-4">
            <div className="max-w-7xl mx-auto py-20 min-h-screen">
                <div className="relative border-4 border-warning px-6 lg:px-20 py-10 rounded-md">
                    <h2 className="hidden lg:block text-3xl font-medium absolute -top-4 bg-gray-100 px-4">
                        Welcome, {user?.displayName}
                    </h2>
                    <h2 className="text-center text-xl lg:text-2xl font-semibold tracking-wide mb-10">Personal Information</h2>
                    <div className="flex flex-col lg:flex-row justify-around items-center text-base mt-5 gap-5 lg:gap-12">
                        <div>
                            <h4><strong className="me-2">Name:</strong> {user?.displayName}</h4>
                        </div>
                        <div>
                            <h4><strong className="me-2">Email:</strong> {user?.email}</h4>
                        </div>
                    </div>
                    <h2 className="text-center text-xl lg:text-2xl font-semibold tracking-wide my-10">Stats</h2>
                    <div className="flex flex-col lg:flex-row justify-around items-center text-base mt-5 gap-5 lg:gap-12">
                        <div>
                            <h4><strong className="me-2">House Rented:</strong> {rentedHouses.length}</h4>
                        </div>
                        <div>
                            {(totalSum && totalSum >= 0) && <h4><strong className="me-2">Total Spent:</strong> {totalSum}</h4>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenantDashboard;