import React from "react";

export default function DatasetUpdateModal({ onAccept, onReject, remoteDate }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-[#231821] rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-2">New Dataset Available</h2>
        <div className="mb-4">
          A new version of the coin master dataset is available.
          {remoteDate && (
            <div className="text-sm text-gray-500 mt-1">Dataset date: <b>{remoteDate}</b></div>
          )}
          <div className="mt-2">
            Would you like to update your app? You can update now or choose "Not Now" to continue using your local data.
          </div>
        </div>
        <div className="flex gap-4 justify-center mt-4">
          <button
            className="bg-burgundy text-white px-4 py-2 rounded-2xl font-semibold"
            onClick={onAccept}
          >
            Update
          </button>
          <button
            className="bg-gray-300 text-burgundy px-4 py-2 rounded-2xl font-semibold"
            onClick={onReject}
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}
