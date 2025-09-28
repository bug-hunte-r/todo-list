import { generatetoken, isValidPassHandler } from "@/configs/authHelper"
import User from "@/model/User"
import { serialize } from "cookie"

export async function POST(req) {
    try {

        const body = await req.json()

        const { username, password } = body
        
        
        if (!username.trim() || !password.trim()) {
            return new Response(JSON.stringify({ message: 'Datas are not valid' }), { status: 409 })
        }

        
        const isUserLogin = await User.findOne({ username: username })
        
        if (!isUserLogin) {
            return new Response(JSON.stringify({ message: 'Account not found' }), { status: 404 })
        }

        const verifedPass = await isValidPassHandler(password, isUserLogin.password)
        
        if (!verifedPass) {
            return new Response(JSON.stringify({ message: 'Username or password is invalid' }), { status: 422 })
        }

        const token = generatetoken({username})

        return new Response(
            JSON.stringify({ message: 'You Are Logined Successfully' }), {
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
        return new Response(JSON.stringify({ message: error.message }), { status: 500 })
    }

}