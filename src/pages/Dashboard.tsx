import { useEffect, useState } from "react";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import Plus from "../icons/Plus";
import Share from "../icons/Share";
import Card from "../components/Card";
import Notes from "../icons/Notes";
import Share2 from "../icons/Share2";
import Trash from "../icons/Trash";
import Model from "../components/Model";
import axios from "axios";
import ShareModel from "../components/ShareModel";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [isShareModelOpen, setShareModelOpen] = useState(false);
  const [content, setContent] = useState<any[]>([]);
  const apiurl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${apiurl}/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setContent(response.data.content);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []); // Fetch content on initial load

  // Refresh content handler
  const refreshContent = async () => {
    await fetchContent(); 
  };

  // Delete handler
  const deleteHandler = async (id: string) => {
    try {
      const response = await axios.delete(`${apiurl}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        
        setContent(content.filter(item => item._id !== id));
        console.log("Content deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Sidebar - Fixed position on large screens */}
      <div className="w-full md:w-64 fixed top-0 left-0 z-10 md:relative md:flex-shrink-0 bg-white shadow-md">
        {/* For larger screens, show full sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
      </div>

      {/* Main Content Area - Right side of the screen */}
      <div className="flex-grow pl-0 md:pl-5 mt-4 md:mt-8 pr-4 md:ml-3">
        {/* Mobile Not Compatible Message */}
        <div className="block md:hidden p-4 text-center text-xl text-red-500 font-bold">
          Application not compatible for mobile screens
        </div>

        {/* Only show content on larger screens */}
        <div className="hidden md:block">
          {/* Title and Buttons Section */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
            <div className="text-2xl font-bold">All Notes</div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant={"Primary"}
                title={"Add Content"}
                size={"sm"}
                startIcon={<Plus />}
                onClick={() => setModelOpen(true)}
              />
              <Button
                variant={"Secondary"}
                title={"Share Brain"}
                size={"sm"}
                startIcon={<Share />}
                onClick={() => setShareModelOpen(true)}
              />
              <Button variant="Danger" title={"Logout"} size={"sm"} onClick={logoutHandler} />
              {/* Refresh Button */}
              <Button
                variant={"Primary"}
                title={"Refresh"}
                size={"sm"}
                onClick={refreshContent} // Triggers the content refresh
              />
            </div>
          </div>

          {/* Content Cards - Grid layout for responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                startIcon={<Notes />}
                middleIcon={<Share2 />}
                endIcon={<Trash onClick={() => deleteHandler(item._id)} />}
                type={item.types}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModelOpen && <Model isOpen={isModelOpen} onClose={() => setModelOpen(false)} />}
      {isShareModelOpen && <ShareModel isOpen={isShareModelOpen} onClose={() => setShareModelOpen(false)} />}
    </div>
  );
};

export default Dashboard;
