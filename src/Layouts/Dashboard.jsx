import { FaAd, FaCartPlus, FaHome, FaList, FaMoneyBill, FaPhone, FaUsers, FaUtensils } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useCart from '../Hooks/useCart';

const Dashboard = () => {
    // TODO: Get Admin from the DB
    const { isAdmin } = useAdmin()
    const { cart } = useCart()
    // console.log(isAdmin)

    return (
        <section className='flex'>
            <div className="w-64 min-h-screen text-black bg-gray-600 ">
                <ul className='menu gap-2'>

                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/adminHome'>
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                                </li>
                                <li><NavLink to='/dashboard/addItems'>
                                    <FaUtensils></FaUtensils>
                                    Add Items</NavLink>
                                </li>
                                <li><NavLink to='/dashboard/manageItems'>
                                    <FaList></FaList>
                                    Manage Items</NavLink>
                                </li>
                                <li><NavLink to='/dashboard/manageBookings'>
                                    <FaAd></FaAd>
                                    Manage Bookings</NavLink>
                                </li>
                                <li><NavLink to='/dashboard/allUsers'>
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                                </li>
                            </>
                            :
                            <></>
                    }


                    <div className='divider'></div>

                    <li><NavLink to='/'>
                        <FaHome></FaHome>
                        Home</NavLink>
                    </li>
                    <li><NavLink to='/menu'>
                        <FaList></FaList>
                        Menu</NavLink>
                    </li>
                    <li><NavLink to='/dashboard/cart'>
                        <FaCartPlus></FaCartPlus>
                        Cart({cart?.length})</NavLink>
                    </li>
                    <li><NavLink to='/dashboard/paymentHistory'>
                        <FaMoneyBill></FaMoneyBill>
                        Payment History</NavLink>
                    </li>
                    <li><NavLink to='/contact'>
                        <FaPhone></FaPhone>
                        Contact</NavLink>
                    </li>
                </ul>
            </div>

            {/* Outlet */}
            <section className='flex-1 p-4'>
                <Outlet></Outlet>
            </section>
        </section>
    );
};

export default Dashboard; 