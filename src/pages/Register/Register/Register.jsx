import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import LoginAnimation from '../../../assets/animation/animation_lk0sn9b8.json';
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";


const Register = () => {
    const { createUser, updateUserProfile, logOut } = useAuth();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOSTING_URL}`;

    const onSubmit = (data) => {
        const formDate = new FormData();

        formDate.append('image', data.profile[0]);

        fetch(imgHostingUrl, {
            method: 'POST',
            body: formDate
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;

                    createUser(data.email, data.password)
                        .then(result => {
                            const createdUser = result.user;

                            updateUserProfile(data.name, imgURL)
                                .then(() => {
                                    console.log('Profile Updated...');

                                    logOut()
                                        .then(() => {
                                            console.log('Registered Successfully...');

                                            // save the user to the database

                                            const newUser = {
                                                name: createdUser.displayName,
                                                email: createdUser.email,
                                                profilePicture: createdUser.photoURL,
                                                role: data.rememberme ? 'Owner' : 'Tenant'
                                            }

                                            // console.log(newUser);
                                            axios.post('http://localhost:5000/users', newUser)
                                                .then(res => {
                                                    if (res.data.insertedId) {
                                                        reset();
                                                        Swal.fire('Register Successful...');
                                                        navigate('/login');
                                                    }
                                                });
                                        })
                                        .catch(error => console.log(error));
                                })
                                .catch(error => console.log(error));
                        })
                        .catch(error => console.log(error));
                }
            });
    }

    return (
        <div className="w-full py-12 bg-orange-50 px-4 lg:px-0">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-20 border-2 bg-orange-300 rounded-md shadow-lg py-10">
                <div className="w-full lg:w-2/5 flex items-center px-4 lg:px-0">
                    <Lottie animationData={LoginAnimation} className="w-full" />
                </div>
                <div className="w-full lg:w-2/5 px-4 lg:px-0">
                    <h2 className="text-center text-3xl font-medium mb-6">Please Register!</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full mb-1">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Enter your name..." className="input input-bordered w-full" />
                            {errors.name && <p className="text-red-600 mt-1">Name field is required...</p>}
                        </div>
                        <div className="form-control w-full mb-1">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="Enter your email" className="input input-bordered w-full" />
                            {errors.email && <p className="text-red-600 mt-1">Email field is required...</p>}
                        </div>
                        <div className="form-control w-full mb-1">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Profile Picture</span>
                            </label>
                            <input type="file" {...register("profile", { required: true })} className="file-input file-input-bordered w-full" />
                            {errors.profile && <p className="text-red-600 mt-2">Email field is required...</p>}
                        </div>
                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Password</span>
                            </label>
                            <input type="password" {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*])/ })} placeholder="Enter your password" className="input input-bordered w-full" />
                            {errors.password?.type === 'required' && <p className="text-red-600 mt-2">Password field is required...</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600 mt-2">Password must be 6 characters long...</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600 mt-2">Password must contain one uppercase, one lowercase, one digit and one special character</p>}
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start items-center">
                                <input type="checkbox" {...register("rememberme")} className="checkbox border-black" />
                                <span className="label-text text-xl font-medium ms-4">Create An Owner Account</span>
                            </label>
                        </div>
                        <div className="form-control w-full text-center mt-8">
                            <input type="submit" className="btn btn-success bg-green-600 hover:bg-green-700 text-white text-lg font-semibold capitalize" value="Register" />
                        </div>
                    </form>
                    <div className="flex mt-4 items-center">
                        <h4 className="text-lg">Already Have An Account?</h4>
                        <Link className="text-xl ms-2 text-green-700 font-semibold" to="/login">Login.</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;