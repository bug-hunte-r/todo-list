import connectToDb from "@/configs/db"
import Todo from "@/model/Todo"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {

    await connectToDb()

    const { id } = params

    let body = await req.json()

    let { title, desc, priority } = body

    let findTodoForSetDatasInInput = await Todo.findById(id)

    if (!title?.trim()) title = findTodoForSetDatasInInput.title
    if (!desc?.trim()) desc = findTodoForSetDatasInInput.desc
    if (!priority?.trim()) priority = findTodoForSetDatasInInput.priority

    await Todo.findByIdAndUpdate(id, { $set: { title, desc, priority } })

    return NextResponse.json({message: 'Todo Edited'}, {status: 200})

}