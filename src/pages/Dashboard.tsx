import { useEffect, useState } from "react"
import Button from "../components/Button"
import Sidebar from "../components/Sidebar"
import Plus from "../icons/Plus"
import Share from "../icons/Share"
import Card from "../components/Card"
import Notes from "../icons/Notes"
import Share2 from "../icons/Share2"
import Trash from "../icons/Trash"
import Model from "../components/Model"
import axios from "axios"
import ShareModel from "../components/ShareModel"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const [isModelOpen, setModelOpen] = useState(false)
    const [isShareModelOpen, setShareModelOpen] = useState(false)
    const [content, setContent] = useState<any[]>([])
    const apiurl = import.meta.env.VITE_API_URL 
    const navigate = useNavigate()

    
    const logoutHandler = () =>{
      localStorage.clear()
      navigate("/")
    }


    const fetchContent = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/users/content", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token for authorization if required
            },
          });

          setContent(response.data.content); 
        } catch (error) {
          console.error("Error fetching content:", error);
        }
      };


      useEffect(()=>{
        fetchContent()
      },[])

  return (
   
    <div className ="flex">
      <div className="w-64 fixed">
        <Sidebar />
      </div>
      <div className="pl-72 w-full pr-4">
        <div className="flex flex-row gap-4 mt-8 justify-between">
          <div>
            <div className="text-2xl font-bold">All Notes</div>
          </div>
          <div className="flex gap-3">
            <Button
              variant={"Primary"}
              title={"Add Content"}
              size={"sm"}
              startIcon={<Plus />}
              onClick = {()=> setModelOpen(true)}
            />
            <Button
              variant={"Secondary"}
              title={"Share Brain"}
              size={"sm"}
              startIcon={<Share />}
              onClick={()=> setShareModelOpen(true)}
            />
            <Button variant="Danger" title={"logout"} size={"sm"} onClick={logoutHandler} />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-6">
        {content.map((item, index) => (
            <Card
              key={index}
              title={item.title} 
              startIcon={<Notes />}
              middleIcon={<Share2 onClick ={() => setShareModelOpen(true)}  />}
              endIcon={<Trash />}
              type={item.types}
              link ={item.link} 
            />
          ))}

          
        </div>
      </div>

      {
        isModelOpen && <Model isOpen={isModelOpen} onClose={()=>setModelOpen(false)}/>
      }

    {
      isShareModelOpen && <ShareModel isOpen ={isShareModelOpen} onClose={()=> setShareModelOpen(false)} />
    }
     
    </div>
  )
}

export default Dashboard