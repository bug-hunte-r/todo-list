import React from 'react'
import style from '../../styles/todolist.css'
import media from '../../styles/media-TodoList.css'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";

function TodoCard() {
    return (
        <div className='todo-card'>

            <div className='container-todos-texts'>
                <p className='todo-priority'>Todo Priority</p>
                <h2 className='todo-title'>Todo Title</h2>
                <p className='todo-desc'>Todo des is the best platform for pepole and the animals are very cute and they can eat my dick babay girl hi i do the playbody</p>
            </div>

            <div className='container-todos-icons'>
                <FiEdit2 className='todos-icons' />
                <FiTrash className='todos-icons trash' />
                <FaRegCircleCheck className='todos-icons check' />
            </div>

        </div>
    )
}

export default TodoCard