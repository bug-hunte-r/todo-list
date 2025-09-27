"use client"
import React, { useEffect, useState } from 'react'
import style from '../../styles/todolist.css'
import media from '../../styles/media-TodoList.css'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function TodoCard() {

    const [todos, setTodos] = useState([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [priority, setPriority] = useState('')

    useEffect(() => {
        const getAllTodos = async () => {

            const res = await fetch('http://localhost:3000/api/todo')
            const data = await res.json()
            setTodos(data)
        }

        getAllTodos()
    }, [])

    const editTodoHandler = async () => {

        const todoMap = {
          title,
          desc,
          priority
        }
    
        const res = await fetch('http://localhost:3000/api/todo/edit', {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(todoMap)
        })
        const data = await res.json()
    
        if (res.status === 200) {
          setTitle('')
          setDesc('')
          setPriority('')
    
          setIsEditModalOpen(false)
          window.location.reload()
        }
    
        alert(data.message)
      }

    return (
        <>
            {todos?.map(todo => (

                <div className='todo-card' key={todo._id}>

                    <div className='container-todos-texts'>
                        <p className={`todo-priority ${todo.priority === 'High' ? 're-2' : todo.priority === 'Medium' ? 'or-2' : todo.priority === 'Low' ? 'gr-2' : ''}`}>{todo.priority}</p>
                        <h2 className='todo-title'>{todo.title}</h2>
                        <p className='todo-desc'>{todo.desc}</p>
                    </div>

                    <div className='container-todos-icons'>
                        <FiEdit2 className='todos-icons' />
                        <FiTrash className='todos-icons trash' />
                        <FaRegCircleCheck className='todos-icons check' />
                    </div>

                </div>
            ))}
            <div className={`container-modal ${isEditModalOpen ? 'open-modal' : 'close-modal'}`}>
                <div className='close-and-title'>
                    <IoMdClose className='icon-close-modal' onClick={() => setIsEditModalOpen(false)} />
                    <h2 className='title-add-new-todo-mdoal'>Edit Todo</h2>
                </div>
                <input type='text' placeholder='Title' className='inputs-add-todo top' value={title} onChange={event => setTitle(event.target.value)} />
                <input type='text' placeholder='Description' className='inputs-add-todo' value={desc} onChange={event => setDesc(event.target.value)} />
                <h3 className='title-Priority'>Select the priority level for todo</h3>
                <div className='container-Priority-levels'>
                    <button className='btn-Priority-levels gr' value={'Low'} onClick={event => setPriority(event.target.value)}>Low</button>
                    <button className='btn-Priority-levels or' value={'Medium'} onClick={event => setPriority(event.target.value)}>Medium</button>
                    <button className='btn-Priority-levels re' value={'High'} onClick={event => setPriority(event.target.value)}>High</button>
                </div>
                <button className='btn-add-new-todo-in-modal' onClick={editTodoHandler}>Edit</button>
            </div>
        </>
    )
}

export default TodoCard