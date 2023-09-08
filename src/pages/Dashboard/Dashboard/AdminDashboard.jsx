import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import CountUp from 'react-countup';

const AdminDashboard = () => {
    const [owners, setOwners] = useState([]);
    const [tenants, setTenants] = useState([]);

    const [axiosSecure] = useAxiosSecure();

    const { data: houses = [] } = useQuery({
        queryKey: ['houses'],
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:5000/houses');
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    });

    useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get('/users')
                setOwners(response.data.filter(user => user.role === 'Owner'));
                setTenants(response.data.filter(user => user.role === 'Tenant'));
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <div className="w-full px-4 lg:px-0">
            <div className="max-w-5xl mx-auto min-h-screen py-20">
                <div className="relative border-4 border-warning lg:px-4 py-10 rounded-md">
                    <h2 className="hidden lg:block text-3xl font-medium absolute -top-4 bg-gray-100 px-4">Welcome To Admin Dashboard</h2>
                    <h2 className="text-lg font-medium text-center lg:hidden">Admin Dashboard</h2>
                    <div className="p-8 flex flex-col items-center justify-center space-y-10">
                        <CountUp
                            start={0}
                            end={houses.length}
                            duration={1}
                            delay={0}
                        >
                            {({ countUpRef }) => (
                                <div className="text-base lg:text-xl font-medium flex lg:items-center">
                                    <span ref={countUpRef} className="text-base lg:text-3xl font-semibold" />
                                    +
                                    <span className="ms-2"> Registered Houses</span>
                                </div>
                            )}
                        </CountUp>
                        <CountUp
                            start={0}
                            end={owners.length}
                            duration={0.5}
                            delay={0}
                        >
                            {({ countUpRef }) => (
                                <div className="text-base lg:text-xl font-medium flex lg:items-center">
                                    <span ref={countUpRef} className="text-base lg:text-3xl font-semibold" />
                                    +
                                    <span className="ms-2 "> Registered Owners</span>
                                </div>
                            )}
                        </CountUp>
                        <CountUp
                            start={0}
                            end={tenants.length}
                            duration={0.5}
                            delay={500}
                        >
                            {({ countUpRef }) => (
                                <div className="text-base lg:text-xl font-medium flex lg:items-center">
                                    <span ref={countUpRef} className="text-base lg:text-3xl font-semibold" />
                                    +
                                    <span className="ms-2 "> Registered Tenants</span>
                                </div>
                            )}
                        </CountUp>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;