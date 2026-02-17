import React from "react";

const RoleInfoHeader = ({
    role,
    topicToFocus,
    experience,
    questions,
    description,
    lastUpdated
}) =>{

    return(
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-4">
                    <div className="flex-1 pr-8">
                        <div className="mb-2">
                            <div className="mb-1">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">{role}</h2>
                                    <p className="text-sm text-gray-500">{topicToFocus}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex gap-6 text-sm">
                            <div className="font-medium bg-black text-white rounded-full px-5 py-2 shadow-md">
                                Experience: {experience}{experience == 1 ? " Year" : " Years"}
                            </div>
                            <div className="font-medium bg-black text-white rounded-full px-5 py-2 shadow-md">
                                {questions} Q&A
                            </div>
                            <div className="font-medium bg-black text-white rounded-full px-5 py-2 shadow-md">
                                Last Updated: {lastUpdated}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"/>
                            <div className="w-2 h-2 rounded-full bg-green-500"/>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                            <div className="w-2 h-2 rounded-full bg-red-500"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoleInfoHeader