import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../Components/GoogleLogin';


const Login = () => {
    const captchaRef = useRef(null)
    const [disable, setDisable] = useState(false)
    const { loginUser } = useContext(AuthContext)
    const nav = useNavigate()
    const location = useLocation()

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleCaptcha = () => {
        const value = captchaRef.current.value
        if (validateCaptcha(value)) {
            console.log("did match")
            setDisable(false)
        }
        else {
            console.log('didn not match')
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value;
        const password = form.password.value
        loginUser(email, password)
            .then((res) => {
                // console.log(res.user)
                nav(location?.state?.from || '/')
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate></LoadCanvasTemplate>
                            </label>
                            <input ref={captchaRef} type="text" name="" placeholder="" className="input input-bordered" required />
                            <button onClick={handleCaptcha} className='btn btn-sm mt-4'>Validate</button>
                        </div>

                        <div className="form-control mt-6">
                            <input disabled={disable} type="submit" className="btn btn-primary" value='Login' />
                        </div>
                    </form>
                    <GoogleLogin></GoogleLogin>
                    <Link to='/register'>
                        <p className='text-blue-700 font-bold cursor-pointer'>New Here? Create a new account.</p>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Login;