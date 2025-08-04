import React from "react";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios"
function Register(){
   const [name, setName] = useState("")
       const [email, setEmail] = useState("")
       const [password, setPassword] = useState("")
         const navigate = useNavigate()
    const   handleRegisterUser = (e)=>{
         e.preventDefault()
         axios.post("https://project-backend-last.onrender.com/register/user",{
            "name": name,
            "email":email,
            "password": password
         }).then((res)=>{
           toast("User Registered Successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                onClose:() => navigate("/login")
            })
         })
       }
    return <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0  opacity-50 z-0"></div>
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-10 rounded-lg shadow-md w-full max-w-md z-10 relative">
        <h2 className="text-white text-center text-2xl font-semibold mb-6">SIGN UP</h2>
        <form>
          <div className="mb-4">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaUser />
              </span>
              <input  value={name} onChange={(name) => setName(name.target.value)}
                type="text"placeholder="Username" className="pl-8 w-full px-3 py-2 rounded bg-white focus:outline-none"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaEnvelope />
              </span>
              <input  value={email} onChange={(email) => setEmail(email.target.value)} 
                type="email"
                placeholder="E-mail"
                className="pl-8 w-full px-3 py-2 rounded bg-white focus:outline-none"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaLock />
              </span>
              <input
              value={password} onChange={(password) => setPassword(password.target.value)}
                type="password"
                placeholder="Password"
                className="pl-8 w-full px-3 py-2 rounded bg-white focus:outline-none"
              />
            </label>
          </div>
          <button
           onClick={handleRegisterUser}
            className="w-full bg-gradient-to-br from-purple-600 to-blue-400 hover:bg-blue-700 text-white py-2 rounded-full font-semibold">CREATE ACCOUNT</button>

          <Link to="/login" className="text-white pl-16 text-sm text-center mt-4 cursor-pointer hover:underline">
            Already have an account? Login here
          </Link>
        </form>
      </div>
      <ToastContainer/>
    </div>

}
export default Register