import { getUser } from "@/configs/authHelper";
import connectToDb from "../../../configs/db";
import Todo from "@/model/Todo"
import { NextResponse } from "next/server";
export async function POST(req) {

    await connectToDb()

    const body = await req.json()

    const { title, desc, priority } = body

    if (!title?.trim() || !desc?.trim() || !priority?.trim()) {
        return NextResponse.json({ message: 'Datas are not valid' }, { status: 422 })
    }

    const userInfo = await getUser()

    if (!userInfo) {
        return NextResponse.json({ message: 'Please first login' }, { status: 409 })
    }

    await Todo.create({ title, desc, priority, user: userInfo._id })

    return NextResponse.json({ message: 'Todo Added Successfully' }, { status: 201 })
}

export async function GET() {

    const mainUser = await getUser()

    const allTodos = await Todo.find({ user: mainUser._id }).populate('user', '-password')

    if (allTodos.length === 0) {
        return NextResponse.json({ message: 'Todos not found' }, { status: 404 })
    }

    return NextResponse.json(allTodos, { status: 200 })
}