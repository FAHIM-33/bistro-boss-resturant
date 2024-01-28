import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Config/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic()


    function createUser(email, password) {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function loginUser(email, password) {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    function loginWithGoogle() {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    function logOutUser() {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (usr) => {
            if (usr) {
                axiosPublic.post('/jwt', { email: usr.email })
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false) //Kisu kerpa ase maybe...
                        }
                    })
            }
            else {
                console.log("no User")
                localStorage.removeItem('access-token')
                setLoading(false) //Kisu kerpa ase maybe...
            }
            setUser(usr)
            // setLoading(false)  //Kisu kerpa ase maybe...
        })
        return () => unSubscribe()

    }, [axiosPublic])


    const data = {
        user,
        loading,
        logOutUser,
        createUser,
        loginUser,
        loginWithGoogle,

    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;