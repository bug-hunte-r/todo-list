"use client"
import React, { useEffect, useState } from 'react'
import style from '../../styles/todolist.css'
import media from '../../styles/media-TodoList.css'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { IoIosList } from "react-icons/io";

function TodoCard() {

    const [todos, setTodos] = useState([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [priority, setPriority] = useState('')
    const [todoId, setTodoId] = useState(null)
    const [filteredTodos, setFilteredTodos] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)

    useEffect(() => {
        const getAllTodos = async () => {

            const res = await fetch('http://localhost:3000/api/todo')
            const data = await res.json()
            setTodos(data)
        }

        getAllTodos()
    }, [])

    const editTodoHandler = async (id) => {

        const todoMap = {
            title,
            desc,
            priority
        }

        const res = await fetch(`http://localhost:3000/api/todo/edit/${id}`, {
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

    const makeCompleteTheTodoHandler = async (id) => {

        const res = await fetch(`http://localhost:3000/api/todo/complete/${id}`, {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'PUT'
        })
        const data = await res.json()

        alert(data.message);
        window.location.reload()
    }

    const deleteTodoHandler = async (id) => {

        const res = await fetch(`http://localhost:3000/api/todo/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
        const data = await res.json()

        alert(data.message)
        window.location.reload()
    }

    const filterHandler = () => {
        let completedTodos = todos.filter(todo => todo.isComplete === true)
        setFilteredTodos(completedTodos)
        setIsFiltered(true)
    }

    const showAllHandler = () => {
        setIsFiltered(false)
    };

    return (
        <>
            <div className='container-filters-btn'>
                <button className='btns-filter-nav' onClick={showAllHandler}>All <IoIosList /></button>
                <button className='btns-filter-nav' onClick={filterHandler}>Completed <IoMdCheckmark /></button>
            </div>

            {(isFiltered ? filteredTodos : todos)?.length > 0 ? (

                (isFiltered ? filteredTodos : todos).map(todo => (
                    <div className='todo-card' key={todo._id}>
                        <div className='container-todos-texts'>
                            <p className={`todo-priority ${todo.priority === 'High' ? 're-2' : todo.priority === 'Medium' ? 'or-2' : todo.priority === 'Low' ? 'gr-2' : ''}`}>{todo.priority}</p>
                            <h2 className='todo-title'>{todo.title}</h2>
                            <p className='todo-desc'>{todo.desc}</p>
                        </div>

                        <div className='container-todos-icons'>
                            <FiEdit2 className='todos-icons' onClick={() => { setIsEditModalOpen(true); setTodoId(todo._id); }} />
                            <FiTrash className='todos-icons trash' onClick={() => deleteTodoHandler(todo._id)} />
                            <FaRegCircleCheck className={`todos-icons ${todo.isComplete ? 'complete' : ''}`} onClick={() => makeCompleteTheTodoHandler(todo._id)} />
                        </div>
                    </div>
                ))
            ) : (
                <p className='no-todos-msg'>No todos to display!</p>
            )}

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
                <button className='btn-add-new-todo-in-modal' onClick={() => editTodoHandler(todoId)}>Edit</button>
            </div>
        </>
    )
}

export default TodoCard