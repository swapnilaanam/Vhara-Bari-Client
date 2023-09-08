import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { PieChart, Pie, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const OwnerDashboard = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: houses = [] } = useQuery({
        queryKey: ['houses', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/houses/user?email=${user?.email}`);
            return response.data;
        }
    });

    const data = [
        { name: 'Total Houses', value: houses.length },
        { name: 'Approved Houses', value: houses.filter(house => house.status === 'Approved').length, fill: "rgb(34, 197, 94)" },
        { name: 'Pending Houses', value: houses.filter(house => house.status === 'Pending').length, fill: "grey" },
        { name: 'Rejected Houses', value: houses.filter(house => house.status === 'Rejected').length, fill: "red" },
        { name: 'Rented House', value: houses.filter(house => house.status === 'Rented').length, fill: "orange" }
    ];

    return (
        <div className="w-full flex justify-center px-4">
            <div className="max-w-7xl mx-auto py-20 min-h-screen">
                <div className="relative border-2 lg:border-4 border-warning px-4 py-10 rounded-md">
                    <h2 className="hidden lg:block text-base font-medium absolute -top-4 bg-gray-100 px-4">
                        Welcome, {user?.displayName}
                    </h2>
                    <h2 className="text-lg font-medium text-center lg:hidden">Owner Dashboard</h2>
                    <div className="flex flex-col lg:flex-row justify-center text-base mt-5 gap-6 lg:gap-12">
                        <div>
                            <h4 className="mb-5"><strong className="me-2">Name:</strong> {user?.displayName}</h4>
                            <h4><strong className="me-2">Total House:</strong> {houses.length}</h4>
                        </div>
                        <div>
                            <h4 className="mb-5"><strong className="me-2">Email:</strong> {user?.email}</h4>
                            <h4><strong className="me-2">Total Rent Collected:</strong> {25000}</h4>
                        </div>
                    </div>
                    <div className="mt-10 w-[80%] mx-auto lg:full h-[400px] flex justify-center">
                        <ResponsiveContainer>
                            <PieChart width={800} height={400}>
                                <Pie
                                    dataKey="value"
                                    data={data}
                                    fill="#8884d8"
                                    label
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* <div className="mt-10 w-full h-[400px] flex lg:hidden justify-center">
                        <ResponsiveContainer>
                            <PieChart width={20} height={20}>
                                <Pie
                                    dataKey="value"
                                    data={data}
                                    fill="#8884d8"
                                    label
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;