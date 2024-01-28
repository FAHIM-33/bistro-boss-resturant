import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxios()

    const { data: payment, isLoading, refetch } = useQuery({
        queryKey: ['paymentHistory'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            console.log(res.data)
            return res.data
        }
    })

    if (isLoading) { return <h3 className="text-2xl text-lime-400 animate-bounce">Loading payment history...</h3> }

    return (
        <div>
            <SectionTitle
                heading='payment history'
                subHeading='At a Glance'
            ></SectionTitle>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payment?.map((obj, i) => <tr key={obj._id}>
                                <th>{i + 1}</th>
                                <td>${obj.price}</td>
                                <td>{obj.transactionID}</td>
                                <td>{obj.status}</td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;