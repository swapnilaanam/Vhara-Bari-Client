import { Link } from "react-router-dom";
import ActiveLink from "../ActiveLink/ActiveLink";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const NavBar = () => {
    const [isNameShown, setIsNameShown] = useState(false);

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('User Logged Out Successfully...');
            })
            .catch(error => console.log(error));
    }

    const navItems = <>
        <li><ActiveLink to="/">Home</ActiveLink></li>
        <li><ActiveLink to="/rentalhouses">Rental Houses</ActiveLink></li>
        <li><ActiveLink to="/dashboard">Dashboard</ActiveLink></li>
        {
            user ? <>
                <li>
                    <div className="avatar" onMouseOver={() => setIsNameShown(true)} onMouseOut={()=> setIsNameShown(false)}>
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user.photoURL} />
                        </div>
                    </div>
                    {
                        isNameShown && <div className="bg-gray-100 hover:bg-gray-200 text-black absolute top-24 -right-24 font-medium">
                            {user?.displayName}
                        </div>
                    }
                </li>
                <li>
                    <div>
                        <button onClick={handleLogOut} className="btn btn-warning flex justify-center items-center">
                            LogOut
                        </button>
                    </div>
                </li>
            </> : <>
                <li>
                    <ActiveLink to="/login">
                        <button className="btn btn-warning px-8 flex justify-center items-center">
                            Login
                        </button>
                    </ActiveLink>
                </li>
            </>
        }
    </>

    return (
        <nav className="navbar bg-base-200 py-2">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost normal-case text-3xl font-bold text-green-500 hover:bg-transparent">
                    Vhara <span className="text-[#ffb300]">Bari</span>
                </Link>
            </div>
            <div className="navbar-end">
                <div className="dropdown z-10">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-6 -ml-40 p-2 shadow bg-base-100 rounded-box w-52 items-end space-y-2 bg-base-200 uppercase">
                        {navItems}
                    </ul>
                </div>
                <ul className="menu menu-horizontal  hidden lg:flex justify-center items-center px-1 uppercase">
                    {navItems}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;