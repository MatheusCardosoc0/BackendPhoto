import { compare } from "bcryptjs";
import { LoginRequest } from "../../@types/interfaces/UserInterfaces";
import { prisma } from "../../utils/prisma";
import { sign } from 'jsonwebtoken'

class LoginService{
  async execute({email, password}: LoginRequest){
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if(!user) throw new Error("User not exist")

    const passwordMath = await compare(password, user.password)

    if(!passwordMath) throw new Error("User not exist")

    //token

    const token = sign({
      name: user.name,
      email: user.email
      }, 
      process.env.JWT_SECRET as string,
      {
      subject: user.id,
      expiresIn: '30d'
      } 
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    }
  }
}

export {LoginService}