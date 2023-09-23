import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

// creating an axios instance
const axiosSecure = axios.create({
    baseURL: 'https://vhara-bari-server.vercel.app'
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // an request interceptor for adding authorization header
        axiosSecure.interceptors.request.use((config) => {
            const accessToken = localStorage.getItem('access-token');

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        });

        // an response interceptor for catching 401 & 403 error
        axiosSecure.interceptors.response.use((response) => {
            return response
        }, (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                logOut()
                    .then(() => {
                        navigate('/login');
                    })
                    .catch(err => console.log(err));
            }

            return Promise.reject(error);
        })
    }, [logOut, navigate])

    return [axiosSecure];
};

export default useAxiosSecure;