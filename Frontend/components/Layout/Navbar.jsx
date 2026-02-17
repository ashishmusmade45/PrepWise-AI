import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="w-full bg-white px-4 py-2 shadow flex items-center justify-between">
            <div className="flex items-center">
                <Link to="/dashboard">
                    <h2 className="text-xl font-bold text-blue-700">Prep Wise AI</h2>
                </Link>
            </div>
            <ProfileInfoCard />
        </div>
    );
};

export default Navbar;