import React from 'react'
import style from '../../styles/Signup-form/SignupForm.css'
import media from '../../styles/Signup-form/mediaSignupForm.css'
import { FaArrowLeft } from "react-icons/fa6";
import Link from 'next/link';

function Login() {
    return (
        <div className='form-container'>
            <div className='form'>
                <div className='icon-and-title'>
                    <FaArrowLeft className='icon-form' />
                    <h2 className='title-form'>Login</h2>
                </div>
                <input type='text' placeholder='Username' className='inputs-form' />
                <input type='password' placeholder='Password' className='inputs-form' />
                <p className='text-form'>Dont have an account? <Link href={'/Signup'} className='link-form'>Signup</Link></p>
                <button className='btn-form'>Login</button>
            </div>
        </div>
    )
}

export default Login