"use client"
import React, { useEffect } from 'react'
import style from '../../styles/todolist.css'
import media from '../../styles/media-TodoList.css'
import TodoCard from '@/components/modules/Todo-card';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { CiUser } from "react-icons/ci";
import Link from 'next/link';
import { TbLogout } from "react-icons/tb";

function TodoList() {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [priority, setPriority] = useState('')
    const [username, setUsername] = useState('')

    const addTodoHandler = async () => {

        const todoMap = {
            title,
            desc,
            priority
        }

        const res = await fetch('http://localhost:3000/api/todo', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(todoMap)
        })
        const data = await res.json()

        if (res.status === 201) {
            setTitle('')
            setDesc('')
            setPriority('')
            setIsAddModalOpen(false)
            window.location.reload()
        }

        alert(data.message)
    }

    useEffect(() => {
        const getUsersInfo = async () => {

            const res = await fetch('http://localhost:3000/api/auth/me')

            const data = await res.json()
            setUsername(data.username)

        }
        getUsersInfo()
    }, [])

    return (
        <>
            <div className='navbar'>
                <h1 className='title-project'>{username ? `Welcome ${username}` : 'Todo List'}</h1>
                <div className='container-right-nav'>
                    <Link href={'/Signup'}> {username ? <TbLogout className='icon-auth' /> : <CiUser className='icon-auth' />} </Link>
                    <h3 className='btn-add-new-todo' onClick={() => setIsAddModalOpen(true)}>Add New Todo</h3>
                </div>
            </div>

            <div className="container">
                <TodoCard />
            </div>

            <div className={`container-modal ${isAddModalOpen ? 'open-modal' : 'close-modal'}`}>
                <div className='close-and-title'>
                    <IoMdClose className='icon-close-modal' onClick={() => setIsAddModalOpen(false)} />
                    <h2 className='title-add-new-todo-mdoal'>Add Todo</h2>
                </div>
                <input type='text' placeholder='Title' className='inputs-add-todo top' value={title} onChange={event => setTitle(event.target.value)} />
                <input type='text' placeholder='Description' className='inputs-add-todo' value={desc} onChange={event => setDesc(event.target.value)} />
                <h3 className='title-Priority'>Select the priority level for todo</h3>
                <div className='container-Priority-levels'>
                    <button className='btn-Priority-levels gr' value={'Low'} onClick={event => setPriority(event.target.value)}>Low</button>
                    <button className='btn-Priority-levels or' value={'Medium'} onClick={event => setPriority(event.target.value)}>Medium</button>
                    <button className='btn-Priority-levels re' value={'High'} onClick={event => setPriority(event.target.value)}>High</button>
                </div>
                <button className='btn-add-new-todo-in-modal' onClick={addTodoHandler}>Add</button>
            </div>
        </>
    )
}

export default TodoList