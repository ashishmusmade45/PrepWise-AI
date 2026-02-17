import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {AnimatePresence, motion} from "framer-motion";
import {LuCircleAlert, LuListCollapse} from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import RoleInfoHeader from "./RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";
import axiosInstance from "../../utils/axiosInstance";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import API_PATHS from "../../utils/apiPaths";

const Interview= ()=>{

    const {sessionId} = useParams();
    const [sessionData, setSessionData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
    const [explanation, setExplanation] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdater, setIsUpdater] = useState(false);
    const [isUpdaterLoader, setIsUpdaterLoader] = useState(false);
    const [error, setError] = useState("");

    const [expandedQuestionId, setExpandedQuestionId] = useState(null);
    const [explanationMap, setExplanationMap] = useState({}); // { [questionId]: explanation }
    const [loadingMap, setLoadingMap] = useState({}); // { [questionId]: boolean }

    // Mock questions for testing if sessionData.questions is missing
    const mockQuestions = [
      {
        question: "What is Node.js?",
        answer: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      },
      {
        question: "Explain the event loop in Node.js.",
        answer: "The event loop allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible.",
      },
    ];

    // Fetch session data by session id
    const fetchSessionDetailsById = async () => {
        try {
            const response = await axiosInstance.get(`/sessions/${sessionId}`);
            setSessionData(response.data); // Adjust if your data is nested
        } catch (error) {
            // handle error
        }
    }



    // Generate Concept Explanation for a specific question
    const generateExplanation = async (questionId, questionText) => {
        setExpandedQuestionId(questionId);
        setExplanationMap(prev => ({ ...prev, [questionId]: null }));
        setLoadingMap(prev => ({ ...prev, [questionId]: true }));
        try {
            const response = await axiosInstance.post("/ai/generate-explanation", { question: questionText });
            setExplanationMap(prev => ({ ...prev, [questionId]: response.data.explanation || JSON.stringify(response.data) }));
        } catch (error) {
            setExplanationMap(prev => ({ ...prev, [questionId]: "Failed to load explanation." }));
        } finally {
            setLoadingMap(prev => ({ ...prev, [questionId]: false }));
        }
    };

    // Pin Question
    const togglePinQuestion = async(questionId)=>{
        try {
            await axiosInstance.post(`/questions/${questionId}/pin`);
            // Refresh session data to update pin state
            fetchSessionDetailsById();
        } catch (error) {
            toast.error("Failed to toggle pin status");
        }
    }

    // Add pin question to a session
    const uploadMoreQuestions = async()=>{
        try{
            setIsUpdaterLoader(true);

            // Call AI Api to generate more questions
            const aiResponse = await axiosInstance.post(
                API_PATHS.GENERATE_QUESTIONS,
                {
                    role:sessionData?.role,
                    experience:sessionData?.experience,
                    topicToFocus:sessionData?.topicToFocus,
                    numberOfQuestions:10,
                }
            );
            const generateQuestions = aiResponse.data;

            const response = await axiosInstance.post(
                API_PATHS.ADD_TO_SESSION,
                {
                    sessionId,
                    questions:generateQuestions,
                }
            )
            if(response.data){
                toast.success("Added More Q&A!!");
                fetchSessionDetailsById();
            }
        }catch(error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("Something Went Wrong. Please try again.");
            }
        }finally{
            setIsUpdaterLoader(false);
        }
    };

    useEffect(()=>{
        if(sessionId){
            fetchSessionDetailsById();
        }
        return () =>{};
    },[]);

    console.log('sessionData:', sessionData);

    // Sort questions: pinned at top (original order), then unpinned (original order)
    const questionsToShow = (sessionData?.questions && sessionData.questions.length > 0
      ? sessionData.questions
      : mockQuestions
    );
    const sortedQuestions = [
      ...questionsToShow.filter(q => q.isPinned),
      ...questionsToShow.filter(q => !q.isPinned)
    ];

    return (
        <DashboardLayout>
            <div className="border-b border-gray-200 mb-4"></div>
            <div className="px-4 py-6 bg-gray-50 min-h-screen">
                <RoleInfoHeader
                    role = {sessionData?.role || ""}
                    topicToFocus={sessionData?.topicToFocus || ""}
                    experience = {sessionData?.experience || "-"}
                    questions = {sessionData?.questions?.length || 0}
                    description = {sessionData?.description || ""}
                    lastUpdated={
                        sessionData?.updatedAt
                        ? moment(sessionData.updatedAt).format("Do MMMM YYYY")
                        :""
                    }
                />
                {sortedQuestions.map((q, idx) => (
                  <QuestionCard
                    key={q._id || idx}
                    question={q.question}
                    answer={q.answer}
                    isPinned={q.isPinned}
                    onTogglePin={q._id ? () => togglePinQuestion(q._id) : undefined}
                    onLearnMore={() => generateExplanation(q._id || idx, q.question)}
                    expanded={expandedQuestionId === (q._id || idx)}
                    explanation={explanationMap[q._id || idx]}
                    loading={loadingMap[q._id || idx]}
                    onCollapse={() => setExpandedQuestionId(null)}
                  />
                ))}
                {!isLoading && 
                sessionData?.questions?.length > 0 && (
                    <div className="flex justify-center mt-6 mb-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading || isUpdaterLoader}
                        onClick={uploadMoreQuestions}
                        >{isUpdaterLoader ?(
                            <SpinnerLoader/>
                        ):(
                            <LuListCollapse className="w-5 h-5"/>
                        )}{" "}
                        Load More</button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Interview