import useAxios from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
    const axiosSecure = useAxios()
    const { user } = useContext(AuthContext)

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: ['isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            return res.data.isAdmin
        }
    })
    return { isAdmin, isAdminLoading }
};

export default useAdmin;