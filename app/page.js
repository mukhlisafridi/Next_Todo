"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Modal from './components/Modal';

export default function Page() {
  const [todo, setTodo] = useState([]);
  const [isVisible, setVisible] = useState(false);
  // COMMIT: todoIdToDelete state banaya hai jo delete hone wali todo ki ID store karega
  const [todoIdToDelete, setTodoIdToDelete] = useState(null);
  
  const { push } = useRouter();
   
  const handlerNavigate = () => {
    push('/add');
  }
  
  const handleEdit = (id) => {
    push(`/edit/${id}`);
  };
  
  // COMMIT: Ye function actual delete karta hai - modal se confirm hone ke baad
  const confirmDelete = async () => {
    try {
      const request = await axios.delete(`/api/todo/${todoIdToDelete}`);
      if(request.status === 200){
        toast.success("Todo deleted successfully");
        // COMMIT: Deleted todo ko state se remove kar rahe hain (page refresh ki zaroorat nahi)
        setTodo(todo.filter(item => item._id !== todoIdToDelete));
      }
    } catch (error) {
      toast.error("Failed to delete todo");
      console.log(error);   
    }
  };
  
  // COMMIT: Ye function delete button click hone par sirf modal open karta hai
  const handleDeleteClick = (id) => {
    setTodoIdToDelete(id); // ID save kar rahe hain
    setVisible(true); // Modal open kar rahe hain
  };
  
  useEffect(() => {
    const getTodo = async () => {
      try {
        const request = await axios.get("api/todo");
        const response = await request.data;
        setTodo(response.todo);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
  }, []);

  return (
    <>
    {/* COMMIT: Modal ko handleConfirm prop pass kar rahe hain jo actual delete karega */}
    <Modal 
      isVisible={isVisible} 
      setVisible={setVisible} 
      handleConfirm={confirmDelete}
    />
    
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 mb-6'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-4xl font-bold text-gray-900 mb-2'>My Tasks</h1>
              <p className='text-gray-500'>Manage your daily todos</p>
            </div>
            <button 
              className='bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105' 
              onClick={handlerNavigate}
            >
              <IoMdAdd size={24}/>
              <span className='font-semibold'>Add Task</span>
            </button>
          </div>
        </div>

        <div className='space-y-4'>
          {todo && todo.length > 0 ? (
            todo.map((elem) => (
              <div 
                key={elem._id} 
                className='bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-l-4 border-black group'
              >
                <div className='flex justify-between items-start'>
                  <div className='flex-1 pr-4'>
                    <h5 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-black transition-colors'>
                      {elem.title}
                    </h5>
                    <p className='text-gray-600 leading-relaxed'>
                      {elem.desc}
                    </p>
                  </div>
                  
                  <div className='flex gap-3'>
                    <button 
                      className='p-3 bg-gray-100 hover:bg-black hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110'
                      onClick={() => handleEdit(elem._id)}
                    >
                      <FaEdit size={20}/>
                    </button>
                    {/* COMMIT: Delete button pe handleDeleteClick call ho raha hai jo modal open karega */}
                    <button 
                      className='p-3 bg-gray-100 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110'
                      onClick={() => handleDeleteClick(elem._id)}
                    >
                      <MdDelete size={22}/>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='bg-white rounded-xl shadow-lg p-12 text-center'>
              <div className='text-gray-400 mb-4'>
                <svg className='w-24 h-24 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                </svg>
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>No Tasks Yet</h3>
              <p className='text-gray-500'>Click the "Add Task" button to create your first todo</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}