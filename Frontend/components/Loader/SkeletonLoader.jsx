import React from "react";

const SkeletonLoader = () => (
  <div className="animate-pulse bg-white shadow-md rounded-lg p-6 mb-4 w-full">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
    <div className="h-3 bg-gray-200 rounded w-full mb-2" />
    <div className="h-3 bg-gray-200 rounded w-5/6 mb-2" />
    <div className="h-3 bg-gray-200 rounded w-2/3" />
  </div>
);

export default SkeletonLoader;