"use client";

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from "react";
import toast from 'react-hot-toast'

export default function page() {
  const params = useParams()
  const{id} =  params
  const {push}=useRouter()
  const [input, setInput] = useState({
    title: "",
    desc: "",
  });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const request = await axios.put(`/api/todo/${id}`, input);
      
     if(request.status === 200){
      toast.success("Todo updated successfully")
      push('/')
     }
    } catch (error) {
      toast.error("Failed to update todo")
      console.log(error);
      
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex justify-center items-center min-h-screen px-4 pt-10">
        <div className="mt-8 flex gap-6 flex-col p-8 md:p-10 rounded-lg shadow-2xl bg-white w-full max-w-md">
          <h1 className="text-black font-bold text-2xl md:text-3xl text-center">Update Todo</h1>
          
          <label className="relative block">
            {/* <span classNameName="text-white text-lg mb-20 mt-20 ">Tittle</span> */}
            <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
            <input
              className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border-2 border-gray-800 rounded-md py-3 pl-4 pr-3 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-1 text-black text-base"
              placeholder="Enter your title"
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
            />
          </label>

          <label className="relative block">
            {/* <span classNameName="text-white text-lg mb-20 mt-20 ">Tittle</span> */}
            <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
            <input
              name="desc"
              className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border-2 border-gray-800 rounded-md py-3 pl-4 pr-3 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-1 text-black text-base"
              placeholder="Enter your description"
              type="text"
              value={input.desc}
              onChange={handleChange}
            />
          </label>

          <button className="rounded-lg bg-black hover:bg-gray-800 transition-colors px-6 py-3 text-white font-bold text-base w-full mt-2">
            Updated Todo
          </button>
        </div>
      </form>
    </>
  );
}