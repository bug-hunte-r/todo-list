import style from '../styles/todolist.css'
import { CiCirclePlus } from "react-icons/ci";

export default function Home() {
  return (
    <div className="container">
      <div className='navbar'>
      <h1 className='title-project'>Todo List</h1>
      <h3 className='btn-add-new-todo'>Add New Todo <CiCirclePlus /></h3>
      </div>
    </div>
  );
}
