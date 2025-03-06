import React from "react";
import { FaArrowLeft, FaPen } from "react-icons/fa";
const Profile = ({setIsProfile}) => {
    const handleShowProfile = () => {
      setIsProfile(true);
    }
  return (
    <div className="w-1/3 h-full bg-gray-200 flex flex-col">
      {/* Header */}
      <div onClick={handleShowProfile} className="bg-[#20ac8b] text-white flex items-center cursor-pointer px-4 py-3 shadow-md">
        <FaArrowLeft
          className="text-lg mr-4 "
        />
        <h1 className="text-lg font-semibold">Profile</h1>
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/9/29/1098867/C9B13FCC-5E85-43C4-9.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name Section */}
      <div className="bg-white mt-6 px-4 py-3 shadow-md flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Your Name</p>
          <p className="text-lg font-semibold">pablo</p>
        </div>
        <FaPen className="text-gray-500 cursor-pointer" />
      </div>

      {/* Info Section */}
      <div className="px-4 py-3 bg-gray-300 mt-4 text-gray-700 text-sm">
        this is not your username, this name will be visible to your WhatsApp
        contacts.
      </div>
    </div>
  );
};

export default Profile;
