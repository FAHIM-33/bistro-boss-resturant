import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home/Home";
import Menu from "./Pages/Menu/Menu";
import Order from "./Pages/Order/Order";
import Login from "./Pages/Login&Register/Login";
import Register from "./Pages/Login&Register/Register";
import PrivateRoute from "./Pages/Login&Register/PrivateRoute";
import Dashboard from "./Layouts/Dashboard";
import Cart from "./Pages/Dashboard/Cart/Cart";
import AllUsers from "./Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "./Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./Pages/Login&Register/AdminRoute";
import ManageItems from "./Pages/Dashboard/ManageItems/ManageItems";
import UpdateItems from "./Pages/Dashboard/ManageItems/UpdateItems";
import Payment from "./Pages/Dashboard/Payment/Payment";
import PaymentHistory from "./Pages/Dashboard/Payment/PaymentHistory";
import AdminHome from "./Pages/Dashboard/AdminHome/AdminHome";
import UserHome from "./Pages/Dashboard/UserHome/UserHome";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <div>This is error page</div>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: 'menu',
                element: <PrivateRoute><Menu></Menu></PrivateRoute>
            },
            {
                path: 'order/:category',
                element: <Order></Order>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            // Admin routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'addItems',
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path: 'manageItems',
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path: 'updateItems/:id',
                element: <AdminRoute><UpdateItems></UpdateItems></AdminRoute>
            },
        ]
    }
])