import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login/Login";
import Register from "../pages/Register/Register/Register";
import RentalHouses from "../pages/RentalHouses/RentalHouses/RentalHouses";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import AddHouse from "../pages/Dashboard/AddHouse/AddHouse";
import MyHouses from "../pages/Dashboard/MyHouses/MyHouses";
import ManageHouses from "../pages/Dashboard/ManageHouses/ManageHouses";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import SingleRentalHouse from "../pages/SingleRentalHouse/SingleRentalHouse/SingleRentalHouse";
import CheckOut from "../pages/CheckOut/CheckOut/CheckOut";
import Payment from "../pages/Payment/Payment/Payment";
import MyRentedHouse from "../pages/Dashboard/MyRentedHouse/MyRentedHouse";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import PrivateRoute from "./PrivateRoute";
import OwnerRoute from "./OwnerRoute";
import AdminRoute from "./AdminRoute";
import TenantRoute from "./TenantRoute";
import ManageRentedHouses from "../pages/Dashboard/ManageRentedHouses/ManageRentedHouses";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/rentalhouses',
                element: <RentalHouses />
            },
            {
                path: '/rentalhouses/:id',
                element: <SingleRentalHouse />
            },
            {
                path: '/checkout/:id',
                element: <TenantRoute><CheckOut /></TenantRoute>
            },
            {
                path: '/payment/:id',
                element: <TenantRoute><Payment /></TenantRoute>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard /></PrivateRoute>
            },
            {
                path: '/dashboard/myhouses',
                element: <OwnerRoute><MyHouses /></OwnerRoute>
            },
            {
                path: '/dashboard/addhouse',
                element: <OwnerRoute><AddHouse /></OwnerRoute>
            },
            {
                path: '/dashboard/managehouses',
                element: <AdminRoute><ManageHouses /></AdminRoute>
            },
            {
                path: '/dashboard/manageusers',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: '/dashboard/managerentedhouses',
                element: <AdminRoute><ManageRentedHouses /></AdminRoute>
            },
            {
                path: '/dashboard/myrentedhouses',
                element: <TenantRoute><MyRentedHouse /></TenantRoute>
            },
            {
                path: '/dashboard/paymenthistory',
                element: <TenantRoute><PaymentHistory /></TenantRoute>
            }
        ]
    }
]);