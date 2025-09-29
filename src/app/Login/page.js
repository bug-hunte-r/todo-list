import LoginForm from '@/components/templates/Login-form'
import { getUser } from '@/configs/authHelper'
import { redirect } from 'next/navigation'
import React from 'react'


async function Login() {

    const isUserLogin = await getUser()

    if (isUserLogin) {
        redirect('/')
    }

    return (
        <>
            <LoginForm />
        </>
    )
}

export default Login