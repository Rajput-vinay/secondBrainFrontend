
interface DropdownInterface {
  title: string;
  Reference : any | null
}

const Dropdown = ({ title,Reference }: DropdownInterface) => {
 

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="platform"
        className="text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <select
        id="platform"
        ref={Reference}
        className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
      >
        <option value="" disabled>
          Select an option
        </option>
        <option value="YOUTUBE">YOUTUBE</option>
        <option value="TWITTER">TWITTER</option>
      </select>
    </div>
  );
};

export default Dropdown;
