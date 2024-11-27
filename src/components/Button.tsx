import { ReactElement } from "react"


interface ButtonInterface {
    variant:"Primary" |"Secondary" | "Danger",
    size: "sm" | "md" | "lg",
    title: string,
    startIcon?: ReactElement,
    onClick?: () => void;
}

const variantStyle  = {
    "Primary":"bg-blue-600 text-white",
    "Secondary":"bg-purple-200 text-purple-600",
    "Danger": "bg-red-500 text-white" 
}

const sizeStyled = {
    "sm":"text-sm px-2 py-1 rounded-md",
    "md":"text-md px-4 py-2 rounded-md",
    "lg":"text-sm px-6 py-3 rounded-md"
}



const Button = ({variant, size,title,startIcon,onClick}: ButtonInterface) => {
  return (
    <button onClick={onClick} className={`${variantStyle[variant]} ${sizeStyled[size]} flex gap-1`}>
      {startIcon}{title}
    </button>
  )
}

export default Button