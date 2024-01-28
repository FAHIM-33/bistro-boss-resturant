import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const { loginWithGoogle } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const nav = useNavigate()

    const handleLogin = () => {
        loginWithGoogle()
            .then((res) => {
                console.log(res)
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        alert('logged in wiht googleI')
                        nav('/')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => console.log(err))
    }


    return (
        <button
            className="px-3 bg-orange-500 py-2 rounded-md"
            onClick={handleLogin}
        >Google Login</button>
    );
};

export default GoogleLogin;