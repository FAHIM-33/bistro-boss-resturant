import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import useCart from "../Hooks/useCart";

const FoodCard = ({ item }) => {
    const { _id, name, image, price, recipe } = item
    const { user } = useContext(AuthContext)
    const nav = useNavigate()
    const location = useLocation()
    const axios = useAxios()
    const { refetch } = useCart()

    const handleAddToCart = () => {
        if (user?.email) {

            const menuItem = {
                food_id: _id,
                email: user.email,
                name,
                image,
                price
            }
            axios.post('/addToCart', menuItem)
                .then(res => {
                    alert("Added Succesfully")
                    refetch()
                })
        }
        else {
            let isConfirm = confirm("log In to add to cart?")
            isConfirm && nav('/login', { state: { from: location.pathname } })
        }
    }

    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button
                        onClick={handleAddToCart}
                        className="px-3 active:scale-95 duration-200 border-b-2  py-2 hover:bg-white hover:text-black rounded-md">Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;