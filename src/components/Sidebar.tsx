import { useState } from "react";
import { Link } from "react-router-dom";
import Book from "../icons/Book";
import Document from "../icons/Document";
import Video from "../icons/video";
import Linkicon from "../icons/Linkicon";
import Tags from "../icons/Tags";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-slate-100 h-screen shadow-sm">
      {/* Sidebar Header */}
      <div className="flex gap-3 pl-4 pt-2 items-center">
        <div><Book /></div>
        <div className="text-2xl">Second Brain</div>
      </div>

      {/* Hamburger Icon for Small Screens */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={toggleSidebar} className="text-2xl">
          {isSidebarOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Sidebar Menu - Items */}
      <div className={`pt-12 pl-4 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <div className="flex gap-3 items-center pl-1 py-2 hover:bg-slate-200 hover:rounded cursor-pointer">
          <div><Video /></div>
          <div className="text-lg">Youtube</div>
        </div>

        <div className="flex gap-3 items-center pl-1 pt-6 hover:bg-slate-200 hover:rounded cursor-pointer">
          <div><Document /></div>
          <div className="text-lg">Document</div>
        </div>

        <div className="flex gap-3 items-center pl-1 pt-6 hover:bg-slate-200 hover:rounded cursor-pointer">
          <div><Linkicon /></div>
          <div className="text-lg">Link</div>
        </div>

        <div className="flex gap-3 items-center pl-1 pt-6 hover:bg-slate-200 hover:rounded cursor-pointer">
          <div><Tags /></div>
          <div className="text-lg">Tags</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
