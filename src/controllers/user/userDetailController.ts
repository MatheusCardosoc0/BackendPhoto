import { Request, Response } from "express";
import { UserDetailsService } from "../../services/user/userDetailsService";

class UserDetailController{
  async handle(req: Request, res: Response){

    const user_id = req.user_id

    const service = new UserDetailsService()

    const detailUser = await service.execute({
      user_id
    })

    return res.json(detailUser)
  }
}

export {UserDetailController}