import React from "react";

const HeaderBadge = ({ modal, setModal }) => {
  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-md font-medium">User Manage</h1>
          <p className="text-sm text-gray-400">Create user for action</p>
        </div>
        <div className="bg-gray-100 py-2 px-4 rounded-xl cursor-pointer">
          <button
            onClick={() => setModal(!modal)}
            className="text-sm font-medium text-slate-400 cursor-pointer"
          >
            + Create
          </button>
        </div>
      </div>
    </div>
  );
};
export default HeaderBadge;
