import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddHouse = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOSTING_URL}`;

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();

        formData.append('image', data.houseimage[0]);

        fetch(imgHostingUrl, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;

                    const newHouse = {
                        houseName: data.housename,
                        ownerName: user?.displayName,
                        ownerEmail: user?.email,
                        houseImage: imgURL,
                        streetAddress: data.streetaddress,
                        city: data.city,
                        bedroomNumber: Number(data.bedroom),
                        livingroomNumber: Number(data.livingroom),
                        dineNumber: Number(data.dine),
                        kitchenNumber: Number(data.kitchen),
                        bathroomNumber: Number(data.bathroom),
                        floorNumber: Number(data.floornumber),
                        rentPrice: Number(data.rent),
                        status: 'Pending'
                    }

                    console.log(newHouse);

                    axiosSecure.post('/houses', newHouse)
                        .then(res => {
                            if (res.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Added A House!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                        .catch(error => console.log(error));
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="w-full px-4 lg:px-0">
            <div className="border-2 border-green-400 max-w-4xl mx-auto my-10 py-10 px-6 lg:px-14 bg-green-400 rounded shadow-lg">
                {/* <h3 className="text-3xl text-center font-medium mb-7 uppercase tracking-wider">Add A House</h3> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">House Name</span>
                            </label>
                            <input type="text" {...register('housename', { required: true })} placeholder="House Name..." className="input input-bordered w-full" />
                            {errors.housename && <p className="text-red-600 mt-1">House Name Field Is Required!</p>}
                        </div>
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Owner Name</span>
                            </label>
                            <input type="text" defaultValue={user?.displayName} {...register('ownername')} placeholder="Owner Name..." className="input input-bordered w-full" disabled />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 mt-4 lg:mt-0">
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Owner Email</span>
                            </label>
                            <input type="email" defaultValue={user?.email} {...register('owneremail')} placeholder="Owner Email..." className="input input-bordered w-full" disabled />
                        </div>
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">House Image</span>
                            </label>
                            <input type="file" {...register('houseimage', { required: true })} className="file-input file-input-bordered w-full" />
                            {errors.houseimage && <p className="text-red-600 mt-1">House Image Is Required!</p>}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 mt-4 lg:mt-0">
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Street Address</span>
                            </label>
                            <input type="text" {...register('streetaddress', { required: true })} placeholder="Street Address(House, Road No etc)..." className="input input-bordered w-full" />
                            {errors.streetaddress && <p className="text-red-600 mt-1">Street Address Field Is Required!</p>}
                        </div>
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">City</span>
                            </label>
                            <select defaultValue={'Sylhet'} {...register('city', { required: true })} className="select select-bordered w-full">
                                <option >Sylhet</option>
                                <option>Dhaka</option>
                                <option>Chittagong</option>
                            </select>
                            {errors.city && <p className="text-red-600 mt-1">City Is Required!</p>}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 mt-4 lg:mt-0">
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Bedroom</span>
                            </label>
                            <select defaultValue={'2'} {...register('bedroom', { required: true })} className="select select-bordered w-full">
                                <option >1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            {errors.bedroom && <p className="text-red-600 mt-1">Bedroom Is Required!</p>}
                        </div>
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Living Room</span>
                            </label>
                            <select defaultValue={'1'} {...register('livingroom', { required: true })} className="select select-bordered w-full">
                                <option >1</option>
                                <option>2</option>
                            </select>
                            {errors.livingroom && <p className="text-red-600 mt-1">Living Room Is Required!</p>}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 mt-4 lg:mt-0">
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Dine</span>
                            </label>
                            <select defaultValue={'1'} {...register('dine', { required: true })} className="select select-bordered w-full">
                                <option >1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            {errors.dine && <p className="text-red-600 mt-1">Dine Is Required!</p>}
                        </div>
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Kitchen</span>
                            </label>
                            <select defaultValue={'1'} {...register('kitchen', { required: true })} className="select select-bordered w-full">
                                <option >1</option>
                                <option>2</option>
                            </select>
                            {errors.kitchen && <p className="text-red-600 mt-1">Kitchen Is Required!</p>}
                        </div>
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Bathroom</span>
                            </label>
                            <select defaultValue={'2'} {...register('bathroom', { required: true })} className="select select-bordered w-full">
                                <option >1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                            {errors.bathroom && <p className="text-red-600 mt-1">Bathroom Is Required!</p>}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 mt-4 lg:mt-0">
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Floor Number</span>
                            </label>
                            <input type="number" {...register('floornumber', { required: true })} placeholder="Floor Number(1/2/3 etc)..." className="input input-bordered w-full" />
                            {errors.floornumber && <p className="text-red-600 mt-1">Floor Number Field Is Required!</p>}
                        </div>
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Rent Price</span>
                            </label>
                            <input type="number" {...register('rent', { required: true })} placeholder="Rent Price..." className="input input-bordered w-full" />
                            {errors.rent && <p className="text-red-600 mt-1">Rent Price Field Is Required!</p>}
                        </div>
                    </div>
                    <div className="form-control w-full mt-8 pb-2">
                        <input type="submit" value="Add House" className="btn btn-warning capitalize" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHouse;