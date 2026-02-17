import React from "react";

const DeleteAlertContent = ({content, onDelete, onCancel}) =>{

    return(
        <div className="p-6">
            <p className="text-gray-700 text-base mb-6 leading-relaxed">{content}</p>
            <div className="flex justify-end gap-3">
                <button 
                    type="button" 
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button 
                    type="button" 
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteAlertContent   