import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [Values, setValues] = useState({
        username: "",
        email: "",
        password: ","
    });
    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...Values, [name]: value});
    };    
    const register = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:1000/app/v1/register", Values);
            alert(res.data.success);
            navigate("/login");
        }catch ( error ){
            console.log(error.response.data.error);
        }
    }
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
                <h1 className="text-3xl font-bold text-center mb-1 text-blue-800">
                    Taskify
                    </h1>
                    <h3 className="text-center font-semibold text-xinc-900">
                        Register with Taskify
                        </h3>            
            </div>
            <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
                <form className="flex flex-col gap-4" >
                    <input type="text" required placeholder="username" className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none" name="username"
                    values={Values.username} 
                    onChange={change}
                    />
                    <input type="email" required placeholder="email" className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none" name="email"
                    values={Values.email} 
                    onChange={change}
                    />
                    <input type="password" required placeholder="password" className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none" name="password"
                    values={Values.password} 
                    onChange={change}
                    />
                    <button className="bg-blue-800 text-white font-semibold by-2 rounded hover:bg-blue-700 transition-all duration-300" onClick={register}>
                        Register
                        </button>
                        <p className="text-center font-semibold text-grey-900">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                </form>
            </div>
        </div>
    );
};

export default Register;