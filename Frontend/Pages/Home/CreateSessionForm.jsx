import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuX } from "react-icons/lu";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";

const CreateSessionForm = ({ onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleCreateSession = async (e) => {
        e.preventDefault();

        const { role, experience, topicToFocus, description } = formData;

        if (!role || !experience || !topicToFocus) {
            setError("Please fill all the required fields");
            return;
        }
        setError("");
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(API_PATHS.CREATE, {
                role,
                experience,
                topicToFocus,
                description,
            });
            const newSessionId = response.data._id;
            if (newSessionId) {
                navigate(`/interview-prep/${newSessionId}`);
            } else if (onSuccess) onSuccess();
        } catch (err) {
            console.log("")
            setError("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto relative">
            {onCancel && (
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                    title="Close"
                >
                    <LuX className="w-5 h-5" />
                </button>
            )}
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Start a New Interview Journey
            </h3>
            <p className="text-gray-600 mb-6">
                Fill out a few quick details and unlock your personalized set of
                interview questions!
            </p>

            <form onSubmit={handleCreateSession} className="space-y-5">
                <Input
                    value={formData.role}
                    onChange={value => handleChange("role", value)}
                    label="Target Role"
                    placeholder="(e.g.,Frontend Developer, UI/UX Designer, etc.)"
                    type="text"
                />
                <Input
                    value={formData.experience}
                    onChange={value => handleChange("experience", value)}
                    label="Experience (in years)"
                    placeholder="e.g., 2"
                    type="number"
                    min="0"
                />
                <Input
                    value={formData.topicToFocus}
                    onChange={value => handleChange("topicToFocus", value)}
                    label="Topic to Focus"
                    placeholder="e.g., React, Data Structures"
                    type="text"
                />
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={e => handleChange("description", e.target.value)}
                        placeholder="Describe your focus or goals for this session"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />
                </div>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                            Creating...
                        </span>
                    ) : (
                        "Create Session"
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateSessionForm;