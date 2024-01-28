import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../Hooks/useCart";
import useAdmin from "../../Hooks/useAdmin";
import Dropdown from "../../Components/Dropdown";

const Navbar = () => {
    const { user, loading, logOutUser } = useContext(AuthContext)
    const { cart, isLoading } = useCart()
    const { isAdmin } = useAdmin()
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY

            if (prevScrollPos < currentScrollPos) {
                setVisible(false)
            } else {
                setVisible(true)
            }
            setPrevScrollPos(currentScrollPos)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos])


    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Menu</Link></li>
        <li><Link to='/order/salad'>Order</Link></li>
        <Dropdown></Dropdown>
        <li><Link to='/dashboard/cart'>
            <button className="flex border p-px text-2xl">
                <FaShoppingCart></FaShoppingCart>
                <div className="badge badge-secondary">+{isLoading || cart?.length}</div>
            </button>
        </Link></li>
        {
            user && isAdmin && <li><Link to='/dashboard/adminHome'>Dashboard(adm)</Link></li>
        }
        {
            user && !isAdmin && <li><Link to='/dashboard/userHome'>Dashboard(usr)</Link></li>
        }
        {user ? <></> : <li><Link to='/login'>Login</Link></li>}
    </>



    return (
        <div className={`navbar ${visible ? '' : 'gone'} fixed z-10 bg-opacity-50 text-white bg-base-100 backdrop-blur-lg`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email &&
                    <a className="btn" onClick={logOutUser}>Logout</a>
                }
            </div>
        </div>
    );
};

export default Navbar;