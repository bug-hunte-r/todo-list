"use client"
import React, { useState } from 'react'
import style from '../../styles/Signup-form/SignupForm.css'
import media from '../../styles/Signup-form/mediaSignupForm.css'
import { FaArrowLeft } from "react-icons/fa6";
import Link from 'next/link';
import { redirect } from 'next/navigation';

function LoginForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async () => {

        const userMap = {
            username,
            password
        }

        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userMap)
        })

        const data = await res.json()

        alert(data.message)

        if (res.status === 200) {
            setUsername('')
            setPassword('')
            redirect('/')
        }

    }

    return (
        <div className='form-container'>
            <div className='form'>
                <div className='icon-and-title'>
                    <Link href={'/'}><FaArrowLeft className='icon-form' /></Link>
                    <h2 className='title-form'>Login</h2>
                </div>
                <input type='text' placeholder='Username' className='inputs-form' value={username} onChange={event => setUsername(event.target.value)} />
                <input type='password' placeholder='Password' className='inputs-form' value={password} onChange={event => setPassword(event.target.value)} />
                <p className='text-form'>Dont have an account? <Link href={'/Signup'} className='link-form'>Signup</Link></p>
                <button className='btn-form' onClick={loginHandler}>Login</button>
            </div>
        </div>
    )
}

export default LoginForm