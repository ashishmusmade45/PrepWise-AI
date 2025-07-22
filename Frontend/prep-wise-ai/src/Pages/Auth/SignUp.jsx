import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { userContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";

const SignUp = ({ setCurrentPage, isModal = false }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {updateUser} = useContext(userContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // Simulate async signup
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    try{
      const response = await axiosInstance.post(API_PATHS.REGISTER,{
        name:fullName,
        email,
        password,
      });

      console.log("Signup response:", response.data);

      const {token} = response.data;

      if(token){
        localStorage.setItem("token",token);
        // Fetch user profile after signup
        const profileResponse = await axiosInstance.get(API_PATHS.PROFILE);
        console.log("Profile fetch after signup:", profileResponse.data);
        updateUser({ ...profileResponse.data, token });
        navigate("/dashboard");
      }
    }catch(error){
      console.error("Signup error:", error);
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try again. ")
      }
    }
  };

  const card = (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Create an Account</h3>
        <p className="text-gray-600">Join us today by entering your details below.</p>
      </div>
      <form onSubmit={handleSignUp} className="space-y-6">
        
        <Input
          label="Full Name"
          value={fullName}
          onChange={setFullName}
          placeholder="Enter your full name"
          required
        />
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
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing up...
            </div>
          ) : (
            "SIGN UP"
          )}
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );

  if (isModal) return card;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {card}
    </div>
  );
};

export default SignUp;