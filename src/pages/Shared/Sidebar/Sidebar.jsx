import useAuth from "../../../hooks/useAuth";
import ActiveLink from "../ActiveLink/ActiveLink";
import { FaHome, FaUsersCog } from "react-icons/fa";
import { MdOutlineManageHistory, MdOutlinePayments } from "react-icons/md";
import { BsHouseAdd, BsHouseLock, BsHouses } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";

import './Sidebar.css';
import useOwner from "../../../hooks/useOwner";
import useTenant from "../../../hooks/useTenant";
import useAdmin from "../../../hooks/useAdmin";

import { SlLogin, SlLogout } from "react-icons/sl";

const Sidebar = () => {
    const { user, logOut } = useAuth();

    const [isOwner, isOwnerLoading] = useOwner();
    const [isTenant, isTenantLoading] = useTenant();
    const [isAdmin, isAdminLoading] = useAdmin();

    const handleLogOut = () => {
        logOut()
            .then(() => console.log('User Logged Out Successfully...'))
            .catch(error => console.log(error));
    }

    const navItems = <>
        {
            user ? <div className="flex flex-col lg:flex-row justify-start lg:justify-center gap-5">
                <li>
                    <div className="avatar">
                        <div className="w-6 lg:w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user.photoURL} />
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <button onClick={handleLogOut} className="lg:btn lg:btn-warning lg:flex justify-center items-center">
                            <span className="hidden lg:block">LogOut</span>
                            <SlLogout className="lg:hidden" />
                        </button>
                    </div>
                </li>
            </div> : <>
                <li>
                    <ActiveLink to="/login">
                        <button className="lg:btn lg:btn-warning lg:flex justify-center items-center">
                            <span className="hidden lg:block">Login</span>
                            <SlLogin className="lg:hidden" />
                        </button>
                    </ActiveLink>
                </li>
            </>
        }
        <div className="divider before:bg-black after:bg-black"></div>
        {
            (!isOwnerLoading && isOwner) && <>
                <li>
                    <ActiveLink to="/dashboard">
                        <div className="flex items-center gap-3">
                            <BiSolidDashboard />
                            <span className="hidden lg:block">Dashboard</span>
                        </div>
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink to="/dashboard/myhouses">
                        <div className="flex items-center gap-3">
                            <BsHouses />
                            <span className="hidden lg:block">My Houses</span>
                        </div>
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink to="/dashboard/addhouse">
                        <div className="flex items-center gap-3">
                            <BsHouseAdd />
                            <span className="hidden lg:block">Add A House</span>
                        </div>
                    </ActiveLink>
                </li>
            </>
        }
        {
            (!isTenantLoading && isTenant) && <>
                <li>
                    <ActiveLink to="/dashboard">
                        <div className="flex items-center gap-3">
                            <BiSolidDashboard />
                            <span className="hidden lg:block">Dashboard</span>
                        </div>
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink to="/dashboard/myrentedhouses">
                        <div className="flex items-center gap-3">
                            <BsHouses />
                            <span className="hidden lg:block">My Rented Houses</span>
                        </div>
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink to="/dashboard/paymenthistory">
                        <div className="flex items-center gap-3">
                            <MdOutlinePayments />
                            <span className="hidden lg:block">Payment History</span>
                        </div>
                    </ActiveLink>
                </li>
            </>
        }
        {
            (!isAdminLoading && isAdmin) && <>
                <li>
                    <ActiveLink to="/dashboard">
                        <div className="flex items-center gap-3">
                            <BiSolidDashboard />
                            <span className="hidden lg:block">Dashboard</span>
                        </div>
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink to="/dashboard/managehouses">
                        <div className="flex items-center gap-3">
                            <MdOutlineManageHistory />
                            <span className="hidden lg:block">Manage Houses</span>
                        </div>
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink to="/dashboard/manageusers">
                        <div className="flex items-center gap-3">
                            <FaUsersCog />
                            <span className="hidden lg:block">Manage Users</span>
                        </div>
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink to="/dashboard/managerentedhouses">
                        <div className="flex items-center gap-3">
                            <BsHouseLock />
                            <span className="hidden lg:block">Manage Rented Houses</span>
                        </div>
                    </ActiveLink>
                </li>
            </>
        }
        <div className="divider before:bg-black after:bg-black pt-5"></div>
        <li>
            <button className="bg-">
                <ActiveLink to="/">
                    <div className="flex items-center gap-3 pt-5">
                        <FaHome />
                        <span className="hidden lg:block">Go To Home</span>
                    </div>
                </ActiveLink>
            </button>
        </li>
    </>

    return (
        <nav className="w-full h-full bg-green-200">
            <div className="px-4 py-5">
                <ul className="space-y-4">
                    {navItems}
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;