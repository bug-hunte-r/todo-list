import { generatetoken, hasedPassHandler } from "@/configs/authHelper"
import connectToDb from "@/configs/db"
import User from "@/model/User"
import { serialize } from "cookie"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        await connectToDb()

        const body = await req.json()

        const { username, password } = body

        if (!username.trim() || !password.trim()) {
            return NextResponse.json({ message: 'Datas are not valid' }, { status: 409 })
        }

        const isUsernameExist = await User.findOne({ username: username })

        if (isUsernameExist) {
            return NextResponse.json({ message: 'Username is already exist' }, { status: 409 })
        }

        const hashedPass = await hasedPassHandler(password)

        const token = generatetoken({ username })

        await User.create({ username, password: hashedPass })

        return NextResponse.json({ message: 'You are signuped' }, {
            status: 201,
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
        return NextResponses.json({ message: error.message }, { status: 500 })
    }

}