import connectToDb from "@/configs/db"
import Todo from "@/model/Todo"

export const POST = async (req) => {

    await connectToDb()

    const body = await req.json()

    

}