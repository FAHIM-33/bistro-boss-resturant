import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, isLoading, refetch } = useCart()
    const totalPrice = cart.reduce((acc, curr) => { return acc + curr.price }, 0)
    const axios = useAxios()

    const handleDelete = (id) => {
        let isConfirm = confirm("Are you sure you want to delete?")
        if (isConfirm) {
            axios.delete(`/cart/${id}`)
                .then(res => {
                    if (res?.data?.deletedCount > 0) {
                        console.log(res.data)
                        refetch()
                    }
                })
                .catch(err => console.log(err))
        }
    }
    if (isLoading) { return <h2 className="text-5xl text-center mt-20">Loading Cart</h2> }

    return (
        <section>
            <div className="flex justify-evenly border">
                <h2 className="text-4xl">Items : {cart.length}</h2>
                <h2 className="text-4xl">Total Price: {totalPrice}</h2>
                {
                    cart.length ? <Link to='/dashboard/payment'>
                        <button className="btn btn-sm bg-red-600">Pay</button>
                    </Link>
                        :
                        <button disabled className="btn btn-sm bg-red-600">Pay</button>
                }
            </div>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart?.map((obj, i) => <tr key={obj._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={obj.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {obj.name}
                                </td>
                                <td>{obj.price}</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(obj._id)}
                                        className="btn text-red-600 ">
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
                                </th>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Cart;