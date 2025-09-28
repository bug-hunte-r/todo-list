import connectToDb from "@/configs/db"
import Todo from "@/model/Todo"

export async function PUT(req, { params }) {

    await connectToDb()

    const { id } = params

    await Todo.findByIdAndUpdate(id, { $set: { isComplete: true } })

    return new Response(JSON.stringify({ message: 'Todo completed' }), { status: 200 })
}