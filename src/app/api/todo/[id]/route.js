import connectToDb from "@/configs/db"
import Todo from "@/model/Todo"

export async function PUT(req, { params }) {

    await connectToDb()

    const { id } = params

    const body = await req.json()

    const { title, desc, priority } = body

    await Todo.findByIdAndUpdate(id, { $set: { title, desc, priority } })

    return new Response(JSON.stringify({ message: 'Todo Edited' }), { status: 200 })
}