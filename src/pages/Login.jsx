import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
function Login(){
   const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
 
    const navigate = useNavigate()
    const loginUser = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:1080/login/user",{
            "email": email,
            "password": password
        }).then((res)=>{
         if(res.data.error){
           toast.error(res.data.error, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
            })
         }  
         else{
            toast.success("User Successfully login", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                onClose:() => navigate("/business")
            })
            localStorage.setItem("user", JSON.stringify(res.data))
         }
        }).catch((err) => {
            toast.error(err.response?.data?.error || "Login failed", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
            })
        })
    }
    return <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0  opacity-50 z-0"></div>
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-10 rounded-lg shadow-md w-full max-w-md z-10 relative">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-purple-600 to-blue-300 w-24 h-24 rounded-full flex items-center justify-center">
            <FaUser className="text-white text-4xl" />
          </div>
        </div>
        <h2 className="text-white text-center text-2xl font-semibold mb-6">LOGIN</h2>
        <form>
          <div className="mb-4">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaUser />
              </span>
              <input value={email} onChange={(email) => setEmail(email.target.value)} 
                type="text"
                placeholder="Email"
                className="pl-8 w-full px-3 py-2 rounded bg-white focus:outline-none"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaLock />
              </span>
              <input value={password} onChange={(password) => setPassword(password.target.value)}
                type="password"
                placeholder="Password"
                className="pl-8 w-full px-3 py-2 rounded bg-white focus:outline-none"
              />
            </label>
          </div>
          <button onClick={loginUser} className="w-full bg-gradient-to-br from-purple-600 to-blue-400 hover:bg-blue-700 text-white py-2 rounded-full font-semibold">LOGIN</button>
          
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-white text-sm hover:underline cursor-pointer">
              Forgot Password?
            </Link>
          </div>
          
          <div className="mt-2 text-center">
            <Link to="/register" className="text-white text-sm cursor-pointer hover:underline">
              Don't have an account? <span className="cursor-pointer">SignUp</span>
            </Link>
          </div>
</form>
      </div>
      <ToastContainer/>
    </div>

}
export default Login