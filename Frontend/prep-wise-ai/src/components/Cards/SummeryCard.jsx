import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummeryCard = ({
    colors,
    role,
    topicToFocus,
    experience,
    questions,
    description,
    lastUpdated,
    onSelect,
    onDelete,
}) => {
    return (
        <div
            className="bg-white rounded-2xl shadow border border-gray-200 p-4 mb-4 max-w-2xl mx-auto hover:shadow-lg transition cursor-pointer"
            onClick={onSelect}
        >
            {/* Top Row: Avatar, Role, Delete */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gray-100 text-2xl font-bold text-gray-700" style={{ background: colors.bgcolor }}>
                        GU
                    </div>
                    <span className="text-lg font-bold text-gray-800 leading-tight">{role}</span>
                </div>
                <button
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    onClick={e => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    title="Delete session"
                >
                    <LuTrash2 className="w-5 h-5" />
                </button>

                <span className="">
                    {getInitials(role)}
                </span>
            </div>
            {/* Subtitle */}
            <div className="text-gray-600 text-sm mb-3 ml-20">{topicToFocus}</div>
            {/* Pills */}
            <div className="flex flex-wrap gap-3 mb-2 ml-20">
                <span className="px-4 py-1 rounded-full border border-gray-300 text-gray-700 text-sm bg-white">Experience: {experience} {experience == 1 ? "Year" : "Years"}</span>
                <span className="px-4 py-1 rounded-full border border-gray-300 text-gray-700 text-sm bg-white">Last Updated: {lastUpdated}</span>
            </div>
            {/* Description */}
            <div className="text-gray-500 text-base mt-1 ml-20">{description}</div>
        </div>
    );
};

export default SummeryCard;