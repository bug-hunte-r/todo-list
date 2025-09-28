import { compare, hash } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import User from "../models/user"
import { cookies } from "next/headers"
import connectToDb from "./db"

const hasedPassHandler = async (password) => {
    const hashedPass = hash(password, 12)
    return hashedPass
}

const generatetoken = ({ ...data }) => {
    const token = sign(data, process.env.PRIVATE_KEY)
    return token
}

const isValidPassHandler = async (password, hashedPass) => {
    const validPass = compare(password, hashedPass)
    return validPass
}

const verifyTokenHandler = async (token) => {
    try {
        const verifedToken = verify(token, process.env.PRIVATE_KEY)
        return verifedToken
    } catch (error) {
        console.log(error);
    }
}

const getUser = async () => {
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
    })

    return user
}


export { hasedPassHandler, generatetoken, isValidPassHandler, verifyTokenHandler, getUser }
