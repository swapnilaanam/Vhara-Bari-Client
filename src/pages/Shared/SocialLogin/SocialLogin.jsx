import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SocialLogin = () => {
    const { googleSignIn, logOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || '/';

    const handleGoogleLogIn = (roleData) => {

        googleSignIn()
            .then((result) => {
                const loggedUser = result.user;

                axios.get(`http://localhost:5000/users/verify/${loggedUser.email}`)
                    .then(res => {
                        const role = res.data.role;

                        if (roleData === 'Owner' && role === 'Tenant') {
                            logOut()
                                .then(() => {
                                    console.log('Logged Out Successfully...');
                                })
                                .catch(error => console.log(error));
                            return Swal.fire('Your Email Is Associated With A Tenant Account. Kindly Login Using Tenant Login Button...');
                        }

                        else if (roleData === 'Tenant' && role === 'Owner') {
                            logOut()
                                .then(() => {
                                    console.log('Logged Out Successfully...');
                                })
                                .catch(error => console.log(error));
                            return Swal.fire('Your Email Is Associated With A Owner Account. Kindly Login Using Owner Login Button...');
                        }

                        else {
                            const newUser = {
                                name: loggedUser.displayName,
                                email: loggedUser.email,
                                profilePicture: loggedUser.photoURL,
                                role: roleData
                            };

                            axios.post('http://localhost:5000/users', newUser)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        console.log('user saved to the data base...');
                                    }

                                    Swal.fire('SingIn Successful...');
                                    navigate(from, {replace: true});
                                })
                                .catch(error => console.log(error));
                        }
                    })
                    .catch(error => console.log(error));

            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <div className="divider py-3">OR</div>
            <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5">
                <button onClick={() => handleGoogleLogIn('Owner')} className="bg-sky-600 hover:bg-sky-700 w-full py-2 text-white rounded-lg">
                    <div className="flex justify-center items-center gap-2">
                        <FaGoogle />
                        <span className="text-lg font-semibold">Login As Owner</span>
                    </div>
                </button>
                <button onClick={() => handleGoogleLogIn('Tenant')} className="bg-gray-600 hover:bg-gray-700 w-full py-2 text-white rounded-lg">
                    <div className="flex justify-center items-center gap-2">
                        <FaGoogle />
                        <span className="text-lg font-semibold">Login As Tenant</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;