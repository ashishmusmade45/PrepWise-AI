import React, { useContext } from "react";
import { userContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
    const { user, loading } = useContext(userContext);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            {user ? <div>{children}</div> : <div>Please log in.</div>}
        </div>
    );
};

export default DashboardLayout;