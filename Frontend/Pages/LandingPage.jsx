import React, { useState, useContext } from "react";
import heroImg from '../assets/hero-img.png';
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal"; 
import { userContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";


const LandingPage = () => {
    const { user } = useContext(userContext);
    console.log("User in LandingPage:", user);
    const navigate = useNavigate();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    const handleCTA = () => {
        if(!user){
            setOpenAuthModal(true);
        }else{
            navigate("/dashboard");
        }
    };

    return (
        <>
        <div className="w-full min-h-screen bg-[#FFFCEF] relative overflow-hidden">
            {/* Background Blur Effect */}
            <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0"></div>
            
            <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
                {/* Header */}
                <header className="flex justify-between items-center mb-16">
                    <div className="text-2xl font-bold text-blue-600">
                        PrepWise AI
                    </div>
                    {user ? (<ProfileInfoCard/>): (<button 
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => setOpenAuthModal(true)}
                    >
                        Login/SignUp
                    </button>)}
                </header>

                {/* Hero Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-block">
                            <div className="bg-blue-100 text-blue-600 px-4 py2 rounded-full text-sm font-medium">
                                AI Powered
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                            Ace Interview with <br/>
                            <span className="text-blue-600">
                                AI-Powered
                            </span>{" "}
                            Learning
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Get Role-Specific questions, expand answers when you need them,
                            dive deeper into concepts, and organize everything your way.
                            From preparation to mastery - your ultimate Interview toolkit is 
                            here.
                        </p>

                        <button 
                            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                            onClick={handleCTA}
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Hero Image */}
                    <div className="flex justify-center">
                        <img 
                            src={heroImg} 
                            alt="AI Interview Preparation" 
                            className="w-full max-w-md h-auto rounded-lg shadow-2xl"
                        />
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-32">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
                        Why Choose PrepWise AI?
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {APP_FEATURES.map((feature) => (
                            <div key={feature.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-2xl font-bold text-blue-600 mb-4">
                                    {feature.id}
                                </div>  
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-32 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Ready to Ace Your Next Interview?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of successful candidates who've mastered their interview skills with AI-powered practice.
                    </p>
                    <button 
                        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                        onClick={handleCTA}
                    >
                        Start Your Journey Today
                    </button>
                </div>
            </div>

            {/* Modal*/}
            <Modal
                isOpen = {openAuthModal}
                onClose = {()=>{
                    setOpenAuthModal(false);
                    setCurrentPage("login");
                }}
                hideHeader
            >
                <div>
                    {currentPage === "login" && (
                        <Login setCurrentPage = {setCurrentPage}/>
                    )}
                    {currentPage === "signup" && (
                        <SignUp setCurrentPage={setCurrentPage} isModal={true}/>
                    )}
                </div>
            </Modal>

            
        </div>
        </>
    );
};

export default LandingPage;