import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EditHouse = ({ index, house, refetch }) => {
    const { _id, houseName, bedroomNumber, livingroomNumber, dineNumber, kitchenNumber, bathroomNumber, floorNumber, rentPrice } = house;

    const [axiosSecure] = useAxiosSecure();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const updatedHouse = {
            houseName: data.housename,
            bedroomNumber: data.bedroom,
            livingroomNumber: data.livingroom,
            dineNumber: data.dine,
            kitchenNumber: data.kitchen,
            bathroomNumber: data.bathroom,
            floorNumber: data.floornumber,
            rentPrice: data.rent
        };

        axiosSecure.patch(`/houses/${_id}`, updatedHouse)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'House Information Updated!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <input type="checkbox" id={`edit_house_${index}`} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-xl bg-green-500">
                    <h3 className="text-3xl text-center font-medium mb-3">Add A House</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full mb-1">
                            <label className="label">
                                <span className="label-text text-xl font-medium">House Name</span>
                            </label>
                            <input type="text" defaultValue={houseName} {...register('housename', { required: true })} placeholder="House Name..." className="input input-bordered w-full" />
                            {errors.housename && <p className="text-red-600 mt-1">House Name Field Is Required!</p>}
                        </div>
                        <div className="flex gap-5">
                            <div className="form-control w-full mb-1">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Bedroom</span>
                                </label>
                                <select defaultValue={bedroomNumber} {...register('bedroom', { required: true })} className="select select-bordered w-full">
                                    <option >1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                                {errors.bedroom && <p className="text-red-600 mt-1">Bedroom Is Required!</p>}
                            </div>
                            <div className="form-control w-full mb-1">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Living Room</span>
                                </label>
                                <select defaultValue={livingroomNumber} {...register('livingroom', { required: true })} className="select select-bordered w-full">
                                    <option >1</option>
                                    <option>2</option>
                                </select>
                                {errors.livingroom && <p className="text-red-600 mt-1">Living Room Is Required!</p>}
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="form-control w-full mb-1">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Dine</span>
                                </label>
                                <select defaultValue={dineNumber} {...register('dine', { required: true })} className="select select-bordered w-full">
                                    <option >1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                {errors.dine && <p className="text-red-600 mt-1">Dine Is Required!</p>}
                            </div>
                            <div className="form-control w-full mb-1">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Kitchen</span>
                                </label>
                                <select defaultValue={kitchenNumber} {...register('kitchen', { required: true })} className="select select-bordered w-full">
                                    <option >1</option>
                                    <option>2</option>
                                </select>
                                {errors.kitchen && <p className="text-red-600 mt-1">Kitchen Is Required!</p>}
                            </div>
                            <div className="form-control w-full mb-1">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Bathroom</span>
                                </label>
                                <select defaultValue={bathroomNumber} {...register('bathroom', { required: true })} className="select select-bordered w-full">
                                    <option >1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                                {errors.bathroom && <p className="text-red-600 mt-1">Bathroom Is Required!</p>}
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="form-control w-full mb-1">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Floor Number</span>
                                </label>
                                <input type="number" defaultValue={floorNumber} {...register('floornumber', { required: true })} placeholder="Floor Number(1/2/3 etc)..." className="input input-bordered w-full" />
                                {errors.floornumber && <p className="text-red-600 mt-1">Floor Number Field Is Required!</p>}
                            </div>
                            <div className="form-control w-full mb-1">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Rent Price</span>
                                </label>
                                <input type="number" defaultValue={rentPrice} {...register('rent', { required: true })} placeholder="Rent Price..." className="input input-bordered w-full" />
                                {errors.rent && <p className="text-red-600 mt-1">Rent Price Field Is Required!</p>}
                            </div>
                        </div>
                        <div className="form-control w-full mt-8 pb-2">
                            <input type="submit" value="Update House" className="btn btn-warning" />
                        </div>
                    </form>
                    <div className="modal-action">
                        <label htmlFor={`edit_house_${index}`} className="btn btn-sm bg-red-500 hover:bg-red-500 text-white border-0 absolute top-6 right-5">
                            Close
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditHouse;