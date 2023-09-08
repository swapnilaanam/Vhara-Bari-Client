import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get('/users');
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    });

    const handleRole = (id) => {
        axiosSecure.patch(`users/${id}`)
            .then(response => {
                if (response.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Role is updated to Admin!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    return (
        <div className="w-full min-h-screen px-4 lg:px-0">
            <div className="max-w-5xl mx-auto my-10">
                <div className="w-[278px] lg:w-full overflow-x-auto">
                    <table className="table text-center">
                        <thead className="text-black border-2 border-gray-400 text-center">
                            <tr>
                                <th></th>
                                <th>Profile Picture</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="border-2 border-gray-400">
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex justify-center items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.profilePicture} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{user.name}</div>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>{user.role}</td>
                                    <th>
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => handleRole(user._id, 'Approved')} className="btn btn-xs btn-success" disabled={user.role === 'Admin' ? true : false}>
                                                Make Admin
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

export default ManageUsers;