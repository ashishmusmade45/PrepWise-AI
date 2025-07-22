import React, { useContext } from "react";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(userContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    };

    // Avatar: use user.profileImage if available, else show initial
    const avatar = user?.profileImage ? (
        <img
            src={user.profileImage}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
        />
    ) : (
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl border-2 border-blue-500">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
    );

    return user &&(
        <div className="flex items-center space-x-3 bg-transparent">
            {avatar}
            <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900 leading-tight">{user?.name || "User"}</span>
                <button
                    onClick={handleLogout}
                    className="text-blue-600 font-semibold text-lg mt-1 text-left hover:underline hover:text-blue-800 transition-colors"
                    style={{ width: "fit-content" }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfoCard;