import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageHouses = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: houses = [], refetch } = useQuery({
        queryKey: ['houses', user?.email],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/houses')
            return response.data;
        }
    });

    const handleStatus = (id, status) => {
        axiosSecure.patch(`/houses/status/${id}`, {
            status: status
        })
            .then(response => {
                if (response.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `House has been ${status}!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="w-full min-h-screen px-4 lg:px-0">
            <div className="max-w-6xl mx-auto my-10">
                <div className="w-[278px] lg:w-full overflow-x-auto">
                    <table className="table text-center">
                        <thead className="text-black border-2 border-gray-400">
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>House Name</th>
                                <th>Owner Name</th>
                                <th>Owner Email</th>
                                <th>Rent Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="border-2 border-gray-400">
                            {
                                houses.map((house, index) => <tr key={house._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={house.houseImage} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{house.houseName}</div>
                                        <div className="text-sm opacity-75">{house.streetAddress}, {house.city}</div>
                                    </td>
                                    <td>
                                        {house.ownerName}
                                    </td>
                                    <td>{house.ownerEmail}</td>
                                    <td>{house.rentPrice}</td>
                                    <td>{house.status}</td>
                                    <th>
                                        <div className="flex gap-3">
                                            <button onClick={() => handleStatus(house._id, 'Approved')} className="btn btn-xs md:btn-sm btn-success capitalize" disabled={house.status !== 'Pending' ? true : false}>
                                                Approve
                                            </button>
                                            <button onClick={() => handleStatus(house._id, 'Rejected')} className="btn btn-xs md:btn-sm btn-warning capitalize" disabled={house.status !== 'Pending' ? true : false}>
                                                Reject
                                            </button>
                                        </div>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageHouses;