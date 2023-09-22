import { NavLink, useLocation } from "react-router-dom";

const ActiveLink = ({ to, children }) => {

    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink to={to} className={isActive ? "active bg-transparent text-orange-500 text-xl font-semibold" : "text-xl font-medium bg-transparent hover:bg-transparent"}>
            {children}
        </NavLink>
    );
};

export default ActiveLink;