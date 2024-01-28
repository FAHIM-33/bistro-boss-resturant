import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useCart = () => {
    const axios = useAxios()
    const { user } = useContext(AuthContext)

    async function getCartData() {
        const res = await axios.get(`/cart/?email=${user?.email}`)
        return res.data

    }

    const { data: cart = [], isLoading, refetch } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: getCartData
    })


    return { cart, isLoading, refetch }
};

export default useCart;