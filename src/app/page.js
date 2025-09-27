import style from '../styles/todolist.css'
import media from '../styles/media-TodoList.css'
import { FaPlus } from "react-icons/fa";
import TodoCard from '@/components/modules/Todo-card';
import { IoMdClose } from "react-icons/io";

export default function Home() {
  return (
    <>

      <div className='navbar'>
        <h1 className='title-project'>Todo List</h1>
        <h3 className='btn-add-new-todo'>Add New Todo <FaPlus className='icon-add-todo' /></h3>
      </div>

      <div className="container">
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
      </div>

      <div className='container-modal'>
        <div className='close-and-title'>
          <IoMdClose className='icon-close-modal' />
          <h2 className='title-add-new-todo-mdoal'>Add Todo</h2>
        </div>
        <input type='text' placeholder='Title' className='inputs-add-todo' />
        <input type='text' placeholder='Description' className='inputs-add-todo' />
        <button className='btn-add-new-todo-in-modal'>Add</button>
        <h3 className='title-Priority'>Select the priority level for this todo.</h3>
        <div className='container-Priority-levels'>
          <button className='btn-Priority-levels gr'>Low</button>
          <button className='btn-Priority-levels or'>Medium</button>
          <button className='btn-Priority-levels re'>High</button>
        </div>
      </div>

    </>
  );
}
