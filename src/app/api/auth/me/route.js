import { verifyTokenHandler } from "@/configs/authHelper"
import connectToDb from "@/configs/db"
import User from "@/model/User"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

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
    }, '-password')

    return NextResponse.json({ user }, { status: 200 })
}