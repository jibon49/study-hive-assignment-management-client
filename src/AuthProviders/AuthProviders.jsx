import { createContext, useEffect, useState } from "react";
import { app } from "../firebase_config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null)

const auth = getAuth(app)

const AuthProviders = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

            const userEmail = currentUser?.email || user?.email;
            const loggedEmail = { email: userEmail }
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);

            if (currentUser) {
                axios.post(`${import.meta.env.VITE_API_BASE_URL}/jwt`, loggedEmail,
                    { withCredentials: true })
                    .then(res => {
                        console.log(res.data.success)
                        if (res.data.success) {
                            console.log('successfully created jwt')
                        }

                    })
            }

            else{
                axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`,loggedEmail, {withCredentials:true})
                .then(res=>{
                    console.log(res)
                })
            }
            
        })
        
        return unSubscribe;
    }, [user?.email])



    const createUser = (email, password, name, photoUrl) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                return updateProfile(result.user, { displayName: name, photoURL: photoUrl })
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Not cool'
                })
                console.error(error)

            })
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        signOut(auth)
            .then()
            .catch(error => {
                console.log(error)
            })
    }

    const userInfo = {
        user,
        createUser,
        logIn,
        loading,
        logOut
    }



    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProviders.propTypes = {
    children: PropTypes.object
};

export default AuthProviders;