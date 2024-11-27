import { useRef } from "react";
import InputTag from "../components/InputTag";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
const LoginPage = () => {
   
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const apiurl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
  const loginHandler = async ()=>{
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    if (!email || !password){
        toast.error("All fields are required!");
        return;
    }
    try {
        const response = await axios.post(`${apiurl}/login`,{
            email,
            password
        })
    
        localStorage.setItem("token",response.data.token)
        
        toast.success("Sign up successful! Redirecting to dashboard...");
        navigate('/dashboard')
    } catch (error) {
        toast.error("An error occurred during sign-up. Please try again.");
    }
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
         

      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      
        {/* Left Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            Meet Evernote, Your Second Brain
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Capture, organize, and share notes from anywhere. Your best ideas
            are always with you and always in sync.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6">
          <InputTag Reference={emailRef} type="email" Placeholder="Enter Your Email" title="Email" />
          <InputTag
          Reference={passwordRef}
            type="password"
            Placeholder="Enter Your Password"
            title="Password"
          />
          <button onClick={loginHandler} className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200">
            Login
          </button>
          <div>Not have account click to? <Link to={"/"}><span className="pointer-cursor font-extrabold">Signup</span> </Link></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
