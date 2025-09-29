import connectToDb from "@/configs/db"
import Todo from "@/model/Todo"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {

    await connectToDb()

    const { id } = params

    await Todo.findByIdAndUpdate(id, { $set: { isComplete: true } })

    return NextResponse.json({message: 'Todo completed'}, {status: 200})
}