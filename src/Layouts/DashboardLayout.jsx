import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Shared/Sidebar/Sidebar";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const DashboardLayout = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="w-full flex justify-start min-h-screen">
            <div className="w-14 lg:w-80">
                <Sidebar />
            </div>
            <div className={`w-full bg-gray-100 lg:flex justify-center`}>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;