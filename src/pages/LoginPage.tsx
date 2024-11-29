import { useRef } from "react";
import InputTag from "../components/InputTag";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const loginHandler = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      toast.success("Login successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4">
            Meet Evernote, Your Second Brain
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Capture, organize, and share notes from anywhere. Your best ideas
            are always with you and always in sync.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <InputTag
            Reference={emailRef}
            type="email"
            Placeholder="Enter Your Email"
            title="Email"
          />
          <InputTag
            Reference={passwordRef}
            type="password"
            Placeholder="Enter Your Password"
            title="Password"
          />
          <button
            onClick={loginHandler}
            className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
          <div className="text-center text-sm sm:text-base">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="font-extrabold text-blue-600 hover:underline">
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
