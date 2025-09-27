"use client"
import React, { useEffect, useState } from 'react'
import style from '../../styles/todolist.css'
import media from '../../styles/media-TodoList.css'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";

function TodoCard() {

    const [todos, setTodos] = useState([])

    useEffect(() => {
        const getAllTodos = async () => {

            const res = await fetch('http://localhost:3000/api/todo')
            const data = await res.json()
            setTodos(data)
        }

        getAllTodos()
    }, [])

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
        </>
    )
}

export default TodoCard