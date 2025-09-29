import React from 'react'
import SignupForm from '@/components/templates/Signup-form';
import { getUser } from '@/configs/authHelper';
import { redirect } from 'next/navigation';

async function Signup () {

    const isUserLogin = await getUser()

    if (isUserLogin) {
        redirect('/')
    }

    return (
        <>
            <SignupForm />
        </>
    )
}

export default Signup