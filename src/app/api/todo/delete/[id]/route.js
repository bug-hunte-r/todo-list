import connectToDb from "@/configs/db";
import Todo from "@/model/Todo";

export async function DELETE(req, { params }) {

    await connectToDb()

    const { id } = params

    await Todo.findByIdAndDelete(id)

    return new Response(JSON.stringify({message: 'Todo deleted'}), {status: 200})
}