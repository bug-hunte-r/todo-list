import connectToDb from "@/configs/db";
import Todo from "@/model/Todo";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {

    await connectToDb()

    const { id } = params

    await Todo.findByIdAndDelete(id)

    return NextResponse.json({message: 'Todo Deleted'}, {status: 200})
}