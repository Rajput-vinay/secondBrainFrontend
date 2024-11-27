import { Link } from "react-router-dom"
import Book from "../icons/Book"
import Document from "../icons/Document"
import Video from "../icons/video"
import Linkicon from "../icons/Linkicon"
import Tags from "../icons/Tags"

const Sidebar = () => {
  return (
    <div className="bg-slate-100 h-screen shadow-sm ">
       <div className="flex gap-3 pl-4 pt-2 items-center">
         <div><Book /></div>
         <div className="text-2xl">Second Brain</div>
       </div>

       <div className="pt-12 pl-4  ">
       <div className="flex gap-3 items-center pl-1 py-2 hover:bg-slate-200 hover:rounded cursor-pointer">
         <div><Video /></div>
         <div className="text-lg ">Youtube</div>
       </div>

       <div className="flex gap-3 items-center pl-1 pt-6 hover:bg-slate-200 hover:rounded cursor-pointer">
         <div><Document /></div>
         <div className="text-lg">Document</div>
       </div>

       <div className="flex gap-3 items-center pl-1 pt-6 hover:bg-slate-200 hover:rounded cursor-pointer">
         <div>< Linkicon/></div>
         <div className="text-lg">Link</div>
       </div>

       <div className="flex gap-3 items-center pl-1 pt-6 hover:bg-slate-200 hover:rounded cursor-pointer">
         <div><Tags /></div>
         <div className="text-lg">Tags</div>
       </div>
       </div>

    </div>
  )
}

export default Sidebar