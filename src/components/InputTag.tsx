import { RefObject } from "react";

interface inputInterface {
    type: string;
    Placeholder: string;
    title: string;
    Reference?: any | null ;
  }
  
  const InputTag = ({ title, type, Placeholder, Reference }: inputInterface) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-md font-medium text-gray-700">{title}</label>
        <input
          ref={Reference}      
          type={type}
          placeholder={Placeholder}
          className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>
    );
  };
  
  export default InputTag;
  