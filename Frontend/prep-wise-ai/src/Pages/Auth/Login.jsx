import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { AUTH_PATHS } from "../../utils/apiPaths";
import { userContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {updateUser} = useContext(userContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Debug: Log the request data
        console.log("Login attempt with:", { email, password });

        try {
            const response = await axiosInstance.post(AUTH_PATHS.LOGIN, {
                email,
                password,
            });
            
            // Debug: Log the response
            console.log("Login response:", response.data);
            
            const { token } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                // Fetch user profile after login
                const profileResponse = await axiosInstance.get(AUTH_PATHS.PROFILE);
                updateUser({ ...profileResponse.data, token });
                navigate("/dashboard");
            }
        } catch (error) {
            // Debug: Log the error details
            console.error("Login error:", error);
            console.error("Error response:", error.response?.data);
            
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome Back
                </h3>
                <p className="text-gray-600">
                    Please enter your details to login
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter your email"
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter your password"
                    required
                />

                <div className="flex items-center">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Signing in...
                        </div>
                    ) : (
                        "Sign In"
                    )}
                </button>
                
                <div className="text-center">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setCurrentPage("signup")}
                            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;