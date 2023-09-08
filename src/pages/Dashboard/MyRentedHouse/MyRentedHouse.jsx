import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRentedHouse = () => {
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

    return (
        <div className="w-full min-h-screen px-4 lg:px-0">
            <div className="max-w-5xl mx-auto my-10">
                <div className="w-[278px] lg:w-full overflow-x-auto">
                    <table className="table text-center">
                        <thead className="text-black border-2 border-gray-400 bg-gray-300">
                            <tr>
                                <th></th>
                                <th>House Name</th>
                                <th>Owner Name</th>
                                <th>Owner Email</th>
                                <th>Rent/Month</th>
                            </tr>
                        </thead>
                        <tbody className="border-2 border-gray-400 bg-gray-50">
                            {
                                rentedHouses.map((rentedHouse, index) => <tr key={rentedHouse._id}>
                                    <th>
                                        <label>
                                            {index + 1}.
                                        </label>
                                    </th>
                                    <td>
                                        <div className="font-bold">{rentedHouse.houseName}</div>
                                    </td>
                                    <td>
                                        {rentedHouse.ownerName}
                                    </td>
                                    <td>{rentedHouse.ownerEmail}</td>
                                    <td className="font-bold">BDT. {rentedHouse.total}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyRentedHouse;