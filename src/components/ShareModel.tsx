import axios from "axios";
import Xmax from "../icons/X-max";
import Button from "./Button";
import { toast } from "react-toastify";
import { useState } from "react";

interface modelInterface {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModel = ({ isOpen, onClose }: modelInterface) => {
  const apiurl = import.meta.env.VITE_API_URL;
  const [sharedLink, setSharedLink] = useState<string>("");  // To store the shared link

  const shareHandler = async () => {
    const share = true;

    try {
      const response = await axios.post(
        `${apiurl}/share`,
        { share },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && response.data.sharedLink) {
        const link = `${apiurl}/${response.data.sharedLink}`;
        setSharedLink(link);

        // Copy the URL to clipboard
        await navigator.clipboard.writeText(link);
        toast.success(`Copied the URL to clipboard: ${link}`);
      } else {
        toast.error("Failed to get the shared link from the server.");
      }
    } catch (error) {
      toast.error("Failed to share the brain. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-5 border rounded-md w-96"
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-md font-extrabold pl-4 sm:pl-16">Share Your Second Brain</div>
          <div className="text-gray-400 cursor-pointer" onClick={onClose}>
            <Xmax />
          </div>
        </div>

        {/* Modal Content */}
        <div className="space-y-4">
          <p>
            Share your entire collection of notes, documents, tweets, and videos with others.
            They will be able to import your content into their own Second Brain.
          </p>

          {/* Display shared URL */}
          {sharedLink && (
            <div className="bg-gray-100 p-2 rounded-md">
              <strong>Shared URL:</strong>
              <a
                href={sharedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 break-all"
              >
                {sharedLink}
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-4">
          <Button variant="Primary" size="lg" title="Share Brain" onClick={shareHandler} />
        </div>
      </div>
    </div>
  );
};

export default ShareModel;
