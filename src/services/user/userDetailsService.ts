import { DetailUserService } from "../../@types/interfaces/UserInterfaces";
import { prisma } from "../../utils/prisma";

class UserDetailsService{
  async execute({user_id}: DetailUserService){

    if(!user_id) throw new Error('user_id is required')

    const user = await prisma.user.findFirst({
      where: {
        id: user_id
      },
      select: {
        id: true,
        name: true,
        email: true,
        banner: true,
      }
    })

    return user
  }
}

export {UserDetailsService}