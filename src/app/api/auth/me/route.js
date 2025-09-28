import { verifyTokenHandler } from "@/configs/authHelper"
import connectToDb from "@/configs/db"
import User from "@/model/User"
import { cookies } from "next/headers"

export async function GET() {
    await connectToDb()
    const token = (await cookies()).get('token')?.value

    if (!token) {
        return false
    }

    const verifedToken = await verifyTokenHandler(token)

    if (!verifedToken) {
        return false
    }

    const user = await User.findOne({
        username: verifedToken?.username
    })

    return new Response(JSON.stringify(user), {status: 200})
}