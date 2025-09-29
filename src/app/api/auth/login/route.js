import { generatetoken, isValidPassHandler } from "@/configs/authHelper"
import User from "@/model/User"
import { serialize } from "cookie"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {

        const body = await req.json()

        const { username, password } = body


        if (!username.trim() || !password.trim()) {
            return NextResponse.json({ message: 'Datas are not valid' }, { status: 409 })
        }

        const isUserLogin = await User.findOne({ username: username })

        if (!isUserLogin) {
            return NextResponse.json({ message: 'Account not found' }, { status: 404 })
        }

        const verifedPass = await isValidPassHandler(password, isUserLogin.password)

        if (!verifedPass) {
            return NextResponse.json({ message: 'Username or password is invalid' }, { status: 422 })
        }

        const token = generatetoken({ username })

        return NextResponse.json({ message: 'You are logined' }, {
            status: 200,
            headers: {
                'Set-Cookie':
                    serialize('token', token, {
                        maxAge: 60 * 60 * 48,
                        httpOnly: true,
                        path: '/'
                    })
            }
        })

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}