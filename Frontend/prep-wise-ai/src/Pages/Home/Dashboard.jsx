import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { CARD_BG } from "../../utils/data";
import moment from "moment";
import SummaryCard from "../../components/Cards/SummeryCard";
import CreateSessionForm from "./CreateSessionForm";
import Modal from "../../components/Modal";
import DeleteAlertContent from "../../components/Loader/DeleteAlertContent";
import toast from "react-hot-toast";

const Dashboard = () => {
    const navigate = useNavigate();

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        open: false,
        data: null,
    });

    const fetchAllSessions = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.GET_MY_SESSIONS);
            setSessions(response.data);
        } catch (error) {
            console.error("Error fetching session data:", error);
        }
    };

    const deleteSession = async(sessionData)=>{
        try{
            await axiosInstance.delete(API_PATHS.DELETE(sessionData?._id));

            toast.success("Session Deleted Successfully");
            setOpenDeleteAlert({
                open:false,
                data:null,
            });
            fetchAllSessions();
        }catch(error){
            console.error("Error deleting session data:",error);
            if(error.response?.status === 403){
                toast.error("You are not authorized to delete this session");
            } else if(error.response?.status === 404){
                toast.error("Session not found");
            } else {
                toast.error("Failed to delete session. Please try again.");
            }
        }
    }

    useEffect(() => {
        fetchAllSessions();
    }, []);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="flex items-center justify-between mb-6">
                </div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    {sessions?.map((data, index) => (
                        <SummaryCard
                            key={data?._id}
                            colors={CARD_BG[index % CARD_BG.length]}
                            role={data?.role || ""}
                            topicToFocus={data?.topicToFocus || ""}
                            experience={data?.experience || "-"}
                            questions={Array.isArray(data?.questions) ? data.questions.length : 0}
                            description={data?.description || ""}
                            lastUpdated={
                                data?.updatedAt
                                    ? moment(data.updatedAt).format("Do MMMM YYYY")
                                    : ""
                            }
                            onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                            onDelete={() => setOpenDeleteAlert({ open: true, data })}
                        />
                    ))}
                </div>
            </div>
            {/* Add New Button - Fixed Bottom Right */}
            <button
                className="fixed bottom-8 right-8 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors z-50"
                onClick={() => setOpenCreateModal(true)}
            >
                <LuPlus className="w-5 h-5" />
                Add New
            </button>

            <Modal
                isOpen={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                hideHeader
            >
                <div>
                    <CreateSessionForm
                        onSuccess={() => {
                            setOpenCreateModal(false);
                            fetchAllSessions();
                        }}
                        onCancel={() => setOpenCreateModal(false)}
                    />
                </div>
            </Modal>

            <Modal
            isOpen={openDeleteAlert?.open}
                onClose={()=>{
                    setOpenDeleteAlert({open:false, data:null});
                }}
                title="Delete Alert"
            >
            <div className="p-6 bg-white rounded-lg">
                <DeleteAlertContent
                    content = "Are you sure you want to delete this session details?"
                    onDelete={()=> deleteSession(openDeleteAlert.data)}
                    onCancel={() => setOpenDeleteAlert({open:false, data:null})}
                />    
            </div>   
            </Modal>
        </DashboardLayout>
    );
};

export default Dashboard;