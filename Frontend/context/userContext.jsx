import React, {createContext, useState, useEffect} from "react";
import axiosInstance from "../utils/axiosInstance";
import API_PATHS from "../utils/apiPaths";

export const userContext = createContext();

const UserProvider = ({children})=>{

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        if(user) return;

        const accessToken = localStorage.getItem("token");
        if(!accessToken){
            setLoading(false);
            return;
        }
        const fetchUser = async() =>{
            try{
                const response = await axiosInstance.get(API_PATHS.PROFILE);
                setUser(response.data);
            }catch(error){
                console.error("User not authenticated", error);
                if (error.response) {
                    console.error("Profile fetch error response:", error.response.data);
                }
                clearUser();
            }finally{
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const updateUser = (userData)=>{
        setUser(userData);
        localStorage.setItem("token",userData.token);
        setLoading(false);
    }

    const clearUser = ()=>{
        setUser(null);
        localStorage.removeItem("token");
    }; 

    return (
        <userContext.Provider value={{user, loading, updateUser, clearUser}}>
            {children}
        </userContext.Provider>
    );
}

export { UserProvider };