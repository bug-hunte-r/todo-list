import { isValidObjectId } from "mongoose";
import connectToDb from "../../../configs/db";
import Todo from "@/model/Todo"

export async function POST(req) {

    await connectToDb()

    const body = await req.json()

    const { title, desc, priority } = body

    if (!title.trim() || !desc.trim() || !priority.trim()) {
        return new Response(JSON.stringify({ message: 'Datas are not valid' }), { status: 422 })
    }

    await Todo.create({ title, desc, priority })

    return new Response(JSON.stringify({ message: 'Todo Added Successfully' }), { status: 201 })
}

export async function GET() {

    const allTodos = await Todo.find({})

    if (!allTodos) {
        return new Response(JSON.stringify({ message: 'Todo not found' }), { status: 404 })
    }

    return new Response(JSON.stringify(allTodos), { status: 200 })
}

export async function PUT(req) {

    const body = await req.json()

    const { id } = body

    if (!isValidObjectId(_id)) {
        return new Response(JSON.stringify({ message: 'Id is not valid' }))
    }

    await Todo.findByIdAndUpdate({ _id: id }, { $set: { isComplete: true } })

    return new Response(JSON.stringify({ message: 'Todo completed' }))
}