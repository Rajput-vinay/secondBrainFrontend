import { useRef, useState } from "react";
import InputTag from "../components/InputTag";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";

const SignUpPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signUpHandler = async () => {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${apiUrl}/signup`, {
        username,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      toast.success("Sign up successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during sign-up.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="flex flex-col justify-center text-center lg:text-left">
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
          <InputTag
            Reference={usernameRef}
            type="text"
            Placeholder="Enter Your Name"
            title="Username"
            aria-label="Username"
          />
          <InputTag
            Reference={emailRef}
            type="email"
            Placeholder="Enter Your Email"
            title="Email"
            aria-label="Email"
          />
          <InputTag
            Reference={passwordRef}
            type="password"
            Placeholder="Enter Your Password"
            title="Password"
            aria-label="Password"
          />
          <Button
            onClick={signUpHandler}
            variant="Primary"
            size="lg"
            title={isLoading ? "Signing Up..." : "Sign Up"}
            isLoading={isLoading}
            className="shadow-md transition duration-200"
          />
          <div>
            Already have an account?{" "}
            <Link to="/login">
              <span className="font-extrabold text-blue-600 hover:underline">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
