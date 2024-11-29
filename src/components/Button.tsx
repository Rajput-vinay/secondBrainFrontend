import { ReactElement } from "react";

interface ButtonInterface {
  variant: "Primary" | "Secondary" | "Danger"; 
  size: "sm" | "md" | "lg"; 
  title: string; 
  startIcon?: ReactElement; 
  onClick?: () => void; 
  isLoading?: boolean; 
}

// Styles for variants
const variantStyle = {
  Primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300",
  Secondary: "bg-purple-200 text-purple-600 hover:bg-purple-300 focus:ring-2 focus:ring-purple-400",
  Danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300",
};

// Styles for sizes
const sizeStyled = {
  sm: "text-sm px-2 py-1 rounded-md",
  md: "text-md px-4 py-2 rounded-md",
  lg: "text-lg px-6 py-3 rounded-md",
};

// Button component
const Button = ({ variant, size, title, startIcon, onClick, isLoading }: ButtonInterface) => {
  return (
    <button
      onClick={onClick}
      className={`${variantStyle[variant]} ${sizeStyled[size]} flex gap-2 items-center justify-center`}
      type="button"
      disabled={isLoading}
      aria-label={title}
    >
      {/* Display loading spinner if loading, else icon and title */}
      {isLoading ? (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
      ) : (
        <>
          {startIcon}
          {title}
        </>
      )}
    </button>
  );
};

export default Button;
