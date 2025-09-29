import { serialize } from "cookie"
import connectToDb from "../../../../configs/db"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await connectToDb()

        const response = NextResponse.json({ message: 'You are log outed' }, {status: 200})

        response.headers.set(
            'Set-Cookie',
            serialize('token', '', {
                maxAge: 0,
                path: '/',
            })
        )

        return response

    } catch (error) {
        return NextResponse.json({ message: error.message }, {status: 500})
    }
}