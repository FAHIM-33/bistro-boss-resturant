import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu()
    const axiosSecure = useAxios()

    const handleDelete = (id) => {
        let isConfirm = confirm('Want to delete?')
        if (isConfirm) {
            axiosSecure.delete(`/menu/${id}`)
                .then(res => {
                    console.log(res.data)
                    refetch()
                })
                .catch(() => {
                    console.log("Wrong in Item deleting.")
                })
        }
    }

    if (loading) { return <h1 className="text-5xl text-center">Loading...</h1> }
    return (
        <div>
            <SectionTitle
                heading={'manage all items'}
                subHeading={'hurry up'}
            ></SectionTitle>
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
                            <th>Update</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu?.map((obj, i) => <tr key={obj._id}>
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
                                <td>
                                    <Link to={`/dashboard/updateItems/${obj._id}`}>
                                        <button
                                            className="btn text-lg">
                                            <FaEdit></FaEdit>
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(obj._id)}
                                        className="btn text-red-600 ">
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;