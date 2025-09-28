import React from 'react'
import style from '../../styles/Signup-form/SignupForm.css'
import media from '../../styles/Signup-form/mediaSignupForm.css'
import { FaArrowLeft } from "react-icons/fa6";

function Signup() {
  return (
    <div className='form-container'>
        <FaArrowLeft className='icon-form' />
        <div className='form'>
            <h2 className='title-form'>Signup</h2>
            <input type='text' placeholder='Username' className='inputs-form' />
            <input type='password' placeholder='Password' className='inputs-form' />
            <button className='btn-form'>Signup</button>
        </div>
    </div>
  )
}

export default Signup