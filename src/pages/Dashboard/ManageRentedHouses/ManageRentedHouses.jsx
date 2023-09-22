import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageRentedHouses = () => {

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: rentedHouses = [], refetch } = useQuery({
        queryKey: ['rentedHouses', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get('http://localhost:5000/rentedhouses')
            return response.data;
        }
    });

    const handleFreeUpHouse = (rentedHouseId, houseId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Free Up Space!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`http://localhost:5000/rentedhouses/${rentedHouseId}`)
                    .then((response) => {
                        if (response?.data?.deletedCount > 0) {
                            axiosSecure.patch(`http://localhost:5000/houses/status/${houseId}`, { status: 'Approved' })
                                .then((response) => {
                                    if (response?.data?.modifiedCount > 0) {
                                        refetch();
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'House Has Been Freed Up!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    }
                                })
                        }
                    })
            }
        })
    }

    return (
        <div className="w-full min-h-screen px-4 lg:px-0">
            <div className="max-w-6xl mx-auto my-10">
                <div className="w-[278px] lg:w-full overflow-x-auto">
                    <table className="table text-center">
                        <thead className="text-black border-2 border-gray-400">
                            <tr>
                                <th></th>
                                <th>House Name</th>
                                <th>Owner Name</th>
                                <th>Owner Email</th>
                                <th>Renter Name</th>
                                <th>Renter Email</th>
                                <th>Total Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="border-2 border-gray-400">
                            {
                                rentedHouses.map((rentedHouse, index) => <tr key={rentedHouse._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="font-bold">{rentedHouse.houseName}</div>
                                    </td>
                                    <td>
                                        {rentedHouse.ownerName}
                                    </td>
                                    <td>{rentedHouse.ownerEmail}</td>
                                    <td>{rentedHouse.renterName}</td>
                                    <td>{rentedHouse.renterEmail}</td>
                                    <td>{rentedHouse.total}</td>
                                    <th>
                                        <div className="flex gap-3">
                                            <button onClick={() => handleFreeUpHouse(rentedHouse._id, rentedHouse.houseId)} className="btn btn-xs md:btn-sm bg-red-600 hover:bg-red-700 text-white">
                                                Free Up House
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

export default ManageRentedHouses;