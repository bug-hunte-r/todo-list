import style from '../styles/todolist.css'
import { FaPlus } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className='navbar'>
        <h1 className='title-project'>Todo List</h1>
        <h3 className='btn-add-new-todo'>Add New Todo <FaPlus className='icon-add-todo' /></h3>
      </div>
      <div className="container">
      </div>
    </>
  );
}
