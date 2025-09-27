"use client"
import style from '../styles/todolist.css'
import media from '../styles/media-TodoList.css'
import { FaPlus } from "react-icons/fa";
import TodoCard from '@/components/modules/Todo-card';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';

export default function Home() {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)



  return (
    <>

      <div className='navbar'>
        <h1 className='title-project'>Todo List</h1>
        <h3 className='btn-add-new-todo' onClick={() => setIsAddModalOpen(true)}>Add New Todo <FaPlus className='icon-add-todo' /></h3>
      </div>

      <div className="container">
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
      </div>

      <div className={`container-modal ${isAddModalOpen ? 'open-modal' : 'close-modal'}`}>
        <div className='close-and-title'>
          <IoMdClose className='icon-close-modal' onClick={() => setIsAddModalOpen(false)} />
          <h2 className='title-add-new-todo-mdoal'>Add Todo</h2>
        </div>
        <input type='text' placeholder='Title' className='inputs-add-todo' value={title} onChange={event => setTitle(event.target.value)} />
        <input type='text' placeholder='Description' className='inputs-add-todo' value={desc} onChange={event => setDesc(event.target.value)} />
        <h3 className='title-Priority'>Select the priority level for this todo.</h3>
        <div className='container-Priority-levels'>
          <button className='btn-Priority-levels gr' value={'Low'} onClick={event => setPriority(event.target.value)}>Low</button>
          <button className='btn-Priority-levels or' value={'Medium'} onClick={event => setPriority(event.target.value)}>Medium</button>
          <button className='btn-Priority-levels re' value={'High'} onClick={event => setPriority(event.target.value)}>High</button>
        </div>
        <button className='btn-add-new-todo-in-modal' onClick={addTodoHandler}>Add</button>
      </div>

    </>
  );
}
