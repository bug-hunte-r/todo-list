import React from 'react'
import style from '../../styles/todolist.css'
import media from '../../styles/media-TodoList.css'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { CiCircleCheck } from "react-icons/ci";

function TodoCard() {
    return (
        <div className='todo-card'>

            <div className='container-todos-texts'>
                <h4 className='todo-title'>Todo Title</h4>
                <p className='todo-desc'>Todo Desc</p>
                <p className='todo-priority'>Todo Priority</p>
            </div>

            <div className='container-todos-icons'>
                <FiEdit2 className='todos-icons' />
                <FiTrash className='todos-icons' />
                <CiCircleCheck className='todos-icons' />
            </div>

        </div>
    )
}

export default TodoCard