import { prisma } from "../../utils/prisma"
import {hash} from 'bcryptjs'
import { RegisterRequest } from "../../@types/interfaces/UserInterfaces"

class RegisterService {
  async execute({banner, email, name, password}: RegisterRequest){
    const verify = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if(verify) throw new Error("User already exist")

    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
        banner
      },
      select: {
        email: true,
        name: true,
        banner: true
      }
    })

    return user
  }
}

export {RegisterService}