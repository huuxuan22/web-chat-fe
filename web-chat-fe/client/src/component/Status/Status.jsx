import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
const stories = [
    {
      id: 1,
      user: "Nguyễn Thanh Ba",
      time: "5 giờ",
      image: "https://th.bing.com/th/id/OIP.AUp-3hAmZb8tPRnHnFNY2QHaJQ?rs=1&pid=ImgDetMain",
      avatar: "https://th.bing.com/th/id/OIP.AUp-3hAmZb8tPRnHnFNY2QHaJQ?rs=1&pid=ImgDetMain",
      caption: "Tuyển con dâu 🙈",
    },
    {
      id: 2,
      user: "Thanh Truyền",
      time: "6 giờ",
      image: "https://th.bing.com/th/id/OIP.AUp-3hAmZb8tPRnHnFNY2QHaJQ?rs=1&pid=ImgDetMain",
      avatar: "https://th.bing.com/th/id/OIP.AUp-3hAmZb8tPRnHnFNY2QHaJQ?rs=1&pid=ImgDetMain",
      caption: "Một ngày tuyệt vời!",
    },
  ];


const Status = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const prevStory = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : stories.length - 1));
      };
    
      const nextStory = () => {
        setCurrentIndex((prev) => (prev < stories.length - 1 ? prev + 1 : 0));
      };
  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      {/* Màn hình chính */}
      

      {/* Story Viewer */}
        <div className="fixed inset-0 flex bg-black">
          {/* Sidebar Story List */}
          <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold">Tin</h2>
            <button className="mt-4 flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg w-full">
              <PlusIcon className="w-5 h-5 text-white" /> Tạo tin
            </button>
            <div className="mt-4 space-y-4">
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                    index === currentIndex ? "bg-blue-200" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={story.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                  <div>
                    <p className="font-semibold">{story.user}</p>
                    <span className="text-sm text-gray-500">{story.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Story Viewer */}
          <div className="flex-1 flex items-center justify-center relative">
            <button
              onClick={prevStory}
              className="absolute left-4 bg-gray-500 text-white p-2 rounded-full"
            >
              ◀
            </button>
            <div className="relative w-2/3 max-w-xl bg-black rounded-lg">
              <img
                src={stories[currentIndex].image}
                alt="Story"
                className="w-full h-full rounded-lg"
              />
              <div className="absolute top-4 left-4 flex items-center gap-3">
                <img
                  src={stories[currentIndex].avatar}
                  className="w-10 h-10 rounded-full"
                  alt="Avatar"
                />
                <div className="text-white">
                  <p className="font-semibold">{stories[currentIndex].user}</p>
                  <span className="text-sm">{stories[currentIndex].time}</span>
                </div>
              </div>
              <p className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded-md">
                {stories[currentIndex].caption}
              </p>
            </div>
            <button
              onClick={nextStory}
              className="absolute right-4 bg-gray-500 text-white p-2 rounded-full"
            >
              ▶
            </button>

            {/* Nút thoát (❌) */}
            <button onClick = {() => {navigate("/")}} className="absolute top-4 right-4 bg-gray-700 text-white p-2 rounded-full hover:bg-red-500 transition">
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Comment & Reaction Section */}
          <div className="w-1/4 bg-gray-900 p-4 text-white">
          <textarea
              placeholder="Trả lời..."
              className="w-full px-3 py-2 bg-gray-700 rounded-md outline-none resize-none overflow-hidden"
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto"; // Reset chiều cao trước khi tính toán
                e.target.style.height = `${e.target.scrollHeight}px`; // Điều chỉnh theo nội dung
              }}
            ></textarea>
            <div className="mt-4 flex gap-2">
              <button className="text-red-500 text-2xl">❤️</button>
              <button className="text-yellow-400 text-2xl">😂</button>
              <button className="text-blue-500 text-2xl">👍</button>
              <button className="text-blue-300 text-2xl">😮</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Status