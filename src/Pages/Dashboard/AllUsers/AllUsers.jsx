import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { FaTrashAlt, FaUsers } from "react-icons/fa";

const AllUsers = () => {
    const axiosSecure = useAxios()

    async function getAllUsers() {
        const res = await axiosSecure.get('/users')
        return res.data
    }

    const handleMakeAdmin = (id) => {   
        let isConfirm = confirm("Make Admin ???")
        if (isConfirm) {
            axiosSecure.patch(`/users/admin/${id}`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        refetch()
                        alert("Successfull")
                    }
                })

                .catch(err => console.log(err))
        }
    }

    const handleDeleteUser = (id) => {
        let isConfirm = confirm("Are you sure you want to delete?")
        if (isConfirm) {
            axiosSecure.delete(`/users/${id}`)
                .then(res => {
                    console.log(res.data)
                    refetch()
                    alert("user has been deleted")
                })
        }
    }


    const { data: users = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: getAllUsers
    })
    return (
        <div>
            <div>
                <h2>All Users: {users?.length}</h2>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, i) =>
                                    <tr key={user._id}>
                                        <th>{i + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 'admin' ?
                                                    "Admin"
                                                    :
                                                    <button
                                                        onClick={() => handleMakeAdmin(user._id)}
                                                        className="btn">
                                                        <FaUsers className="text-3xl text-orange-500"></FaUsers>
                                                    </button>
                                            }
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
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
        </div>
    );
};

export default AllUsers;