import { generatetoken, hasedPassHandler } from "@/configs/authHelper"
import connectToDb from "@/configs/db"
import User from "@/model/User"
import { serialize } from "cookie"

export async function POST(req) {
    try {

        await connectToDb()

        const body = await req.json()

        console.log(body);
        

        const { username, password } = body

        if (!username.trim() || !password.trim()) {
            return new Response(JSON.stringify({ message: 'Datas are not valid' }), { status: 409 })
        }

        const isUsernameExist = await User.findOne({ username: username })

        if (isUsernameExist) {
            return new Response(JSON.stringify({ message: 'Username is already exist' }), { status: 422 })
        }

        const hashedPass = await hasedPassHandler(password)

        const token = generatetoken({ username })

        await User.create({ username, password: hashedPass })

        return new Response(
            JSON.stringify({ message: 'You are Signuped Successfully' }), {
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
        return new Response(JSON.stringify({ message: error.message }), { status: 500 })
    }

}