import {useRef } from "react";
import Xmax from "../icons/X-max";
import Button from "./Button";
import Dropdown from "./Dropdown";
import InputTag from "./InputTag";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface modelInterface {
  isOpen: boolean;
  onClose: () => void;
}

const Model = ({ isOpen, onClose }: modelInterface) => {
  const apiurl = import.meta.env.VITE_API_URL;
  const linkRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>();
  const tagsRef = useRef<HTMLInputElement>();
  const typeRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const contentHandler = async () => {
    const link = linkRef.current?.value;
    const types = typeRef.current?.value;
    const tags = tagsRef.current?.value;
    const title = titleRef.current?.value;

    if (!title || !types || !tags || !link) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/content`,
        {
          link,
          types,
          title,
          tags,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected token access
          },
        }
      );

      toast.success("Successfully added your content");
      navigate("/dashboard");
      onClose();
    } catch (error) {
      toast.error("Failed to add content. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-5 border rounded-md w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-md font-extrabold pl-4 sm:pl-16">Add Your Content</div>
          <div className="text-gray-400 cursor-pointer" onClick={onClose}>
            <Xmax />
          </div>
        </div>

        {/* Modal Content */}
        <div className="space-y-4">
          <InputTag Reference={linkRef} type="text" Placeholder="Enter the Link" title="Link" />
          <InputTag Reference={titleRef} type="text" Placeholder="Enter the Title" title="Title" />
          <InputTag Reference={tagsRef} type="text" Placeholder="Enter the Tags" title="Tags" />
          <Dropdown Reference={typeRef} title="Type" />
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-4">
          <Button variant="Primary" size="lg" title="Submit" onClick={contentHandler} />
        </div>
      </div>
    </div>
  );
};

export default Model;
