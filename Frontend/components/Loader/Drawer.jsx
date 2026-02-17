import React from "react";
import { LuX } from 'react-icons/lu';

const Drawer = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
        onClick={onClose}
      ></div>
      {/* Drawer panel */}
      <div className="ml-auto w-full max-w-md h-full bg-white shadow-lg p-6 flex flex-col transition-transform duration-300 transform translate-x-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose} aria-label="Close drawer">
            <LuX />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;