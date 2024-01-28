import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxios from "../../Hooks/useAxios";
import GoogleLogin from "../../Components/GoogleLogin";



const Register = () => {

    const { createUser } = useContext(AuthContext)
    const axios = useAxios()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(() => {
                const userInfo = {
                    name: data.email.split('@')[0],
                    email: data.email,
                }
                axios.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        alert("Added User Successfully")
                    })
                    .catch(err => console.log(err))

            })
            .catch(err => {
                console.log(err)
            })
    }

    console.log(watch('example'))

    return (
        <>
            <Helmet><title>Bistro | Register</title></Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">This field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                <input type="text" {...register("password", {
                                    required: true,
                                    minLength: 4,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/
                                })} placeholder="password"
                                    className="input input-bordered" />
                                {errors.password?.type === "required" && <span className="text-red-600">This field is required</span>}
                                {errors?.password?.type === 'maxLength' && <span className="text-red-600">Imma boutto blow</span>}
                                {errors?.password?.type === 'minLength' && <span className="text-red-600">Thats pretty small</span>}
                                {errors?.password?.type === 'pattern' && <span className="text-red-600">Must include 1 uppercase, special character and number</span>}

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value='Register' />
                            </div>
                        </form>
                            <GoogleLogin></GoogleLogin>
                        <Link to='/login'>
                            <p className='text-blue-700 font-bold cursor-pointer'>Have an account? Login here.</p>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Register;