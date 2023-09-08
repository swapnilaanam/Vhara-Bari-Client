import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import LoginAnimation from '../../../assets/animation/animation_lk0sn9b8.json';
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { useState } from "react";

const Login = () => {
    const [error, setError] = useState('');

    const { signIn } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || '/';
    console.log(from);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                reset();
                setError('');
                Swal.fire('SignIn Successful...');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            });
    }

    return (
        <div className="w-full py-16 bg-orange-50 px-4 lg:px-0">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-20 border-2 bg-orange-300 rounded-md shadow-lg py-10">
                <div className="w-full lg:w-2/5 px-4 lg:px-0">
                    <h2 className="text-center text-3xl font-medium mb-6">Login Now!</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full mb-1">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="Enter your email" className="input input-bordered w-full" />
                            {errors.email && <p className="text-red-400 mt-2 font-semibold">Email field is required...</p>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Password</span>
                            </label>
                            <input type="password" {...register("password", { required: true })} placeholder="Enter your password" className="input input-bordered w-full" />
                            {errors.password?.type === 'required' && <p className="text-red-600 mt-2">Password field is required...</p>}
                        </div>
                        {error && <p className="text-red-600 my-3">{error}</p>}
                        <div className="form-control w-full text-center mt-8">
                            <input type="submit" className="btn bg-green-600 hover:bg-green-700 border-0 text-white text-lg font-semibold capitalize" value="Login" />
                        </div>
                    </form>
                    <SocialLogin />
                    <div className="flex mt-5 justify-center items-center">
                        <h4 className="text-lg">{`Don't Have An Account?`}</h4>
                        <Link className="text-xl ms-2 text-green-700 font-semibold" to="/register">Register.</Link>
                    </div>
                </div>
                <div className="w-full lg:w-2/5 px-4 lg:px-0">
                    <Lottie animationData={LoginAnimation} className="w-full" />
                </div>
            </div>
        </div>
    );
};

export default Login;