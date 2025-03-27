    import { onAuthStateChanged } from "firebase/auth";
    import { createContext, useContext, useEffect, useState } from "react";
    import { auth } from "../../firebase/firebase";
    import { initializeApp } from "firebase/app";
    import * as userService from "./../../Service/UserService"
    import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

    const AuthContext = createContext();
    export function AuthProvider   ({children}) {
        console.log("vào Provider trước");
        
        const navigate = useNavigate();
        const [currentUser, setCurrentUser] = useState(null);
        const [userLoggedIn,setUserLoggedIn] = useState(false);
        const [loading,setLoading] = useState(true);
        const token = localStorage.getItem("token");
        const dispatch = useDispatch();
        useEffect(() => {
            if (!token) {
                navigate("/signin");
            }
        },[]);
        useEffect(() => {
            const unsubcribe = onAuthStateChanged(auth, (user) => {
                initializeUser(user); // 👈 đúng logic
            });
            return unsubcribe;
        }, []);
        
        async function initializeUser (user) {
            if (user) {
                setCurrentUser({...user});
                setUserLoggedIn(true);
            }else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
            setLoading(false);
        };

        const value  = {currentUser,userLoggedIn,loading};
        return (
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        )
    }
    export const useAuth = () => {
        return useContext(AuthContext)
    }