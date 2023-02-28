import { Request, Response } from "express";
import { LoginRequest } from "../../@types/interfaces/UserInterfaces";
import { LoginService } from "../../services/user/loginService";

class LoginController{
  async handle(req: Request, res: Response){
    const {email, password}: LoginRequest = req.body

    const service = new LoginService()

    const login = await service.execute({
      email,
      password
    })

    return res.json(login)
  }
}

export {LoginController}