import { useContext } from "react";
import useAdmin from "../../Hooks/useAdmin";
import { AuthContext } from "../../Providers/AuthProvider";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { isAdmin, isAdminLoading } = useAdmin()
    const { user, loading } = useContext(AuthContext)

    if (loading || isAdminLoading) { return <p className="text-center text-7xl text-red-600  pt-48">Loading admin</p> }
    if (!isAdmin) { return <Navigate to='/login'></Navigate> }
    return children
};

export default AdminRoute;