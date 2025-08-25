import React, { useEffect } from "react";
import {useNavigate, useRoutes} from "react-router-dom";

// Pages List
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Profile from "./components/user/Profile.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";

// Auth Context 
import { useAuth } from "./authContext.jsx";
import CreateRepo from "./components/repo/CreateRepo.jsx";

const ProjectRoutes = () => {
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)){
            navigate("/auth");
        }

        if(userIdFromStorage && window.location.pathname=="/auth"){
            navigate("/dashboard");
        }
    }, [currentUser, navigate, setCurrentUser]);

    let element = useRoutes([
        {
            path:"/",
            element:<Dashboard />
        },
        {
            path:"/auth",
            element:<Login />
        },
        {
            path:"/signup",
            element:<Signup />
        },
        {
            path:"/profile",
            element:<Profile />
        },
        {
            path:"/createRepo",
            element:<CreateRepo />
        },
        
    ])

    return element;
}

export default ProjectRoutes;
