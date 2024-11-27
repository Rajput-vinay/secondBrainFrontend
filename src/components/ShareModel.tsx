
import axios from "axios";
import Xmax from "../icons/X-max";
import Button from "./Button";
import { toast } from "react-toastify";



interface modelInterface {
  isOpen: boolean; // Fixed type
  onClose: () => void;
}

const ShareModel = ({ isOpen, onClose }: modelInterface) => {
const apiurl = import.meta.env.VITE_API_URL
   
const shareHandler = async() =>{
    const share = true;
    
   const response = await axios.post(`${apiurl}/share`,{
    share
   },{
    headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
   })
    await navigator.clipboard.writeText(`${apiurl}/response.data.sharedLink`)
     
    toast.success(`copy the url in clipboard ${apiurl}/response.data.sharedLink`)
   onClose()
}


  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-5 border rounded-md w-96"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-md font-extrabold pl-28">Share Your Second Brain</div>
          <div className="text-gray-400 cursor-pointer" onClick={onClose}>
            <Xmax />
          </div>
        </div>

        {/* Modal Content */}
        <div className="space-y-4">
           Share your entire Collection notes, document, tweet, and video with other.They will import your content into their own Second Brain.
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-4">
          <Button variant="Primary" size="lg" title="Share Brain"  onClick={shareHandler} />
        </div>
      </div>
    </div>
  );
};

export default ShareModel;
