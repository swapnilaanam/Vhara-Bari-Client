import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SingleHouse from "./SingleHouse";
import { useQuery } from "@tanstack/react-query";

const MyHouses = () => {
    const { user } = useAuth();

    const [axiosSecure] = useAxiosSecure();

    const { data: houses = [], refetch } = useQuery({
        queryKey: ['houses', user?.email],
        queryFn: async () => {
            const response = await axiosSecure(`/houses/user?email=${user?.email}`);
            return response.data;
        }
    });

    const handleDelete = (id) => {
        console.log(id);
        axiosSecure.delete(`/houses/${id}`)
            .then(response => {
                // console.log(response.data);
                if (response.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'House Has Been Deleted',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="py-10 min-h-screen">
            <h3 className="text-3xl font-medium text-center mb-12">My Houses</h3>
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-8">
                {
                    houses.map((house, index) => <SingleHouse
                        key={house._id}
                        index={index}
                        house={house}
                        handleDelete={handleDelete}
                        refetch={refetch}
                    >
                    </SingleHouse>)
                }
            </div>
        </div>
    );
};

export default MyHouses;