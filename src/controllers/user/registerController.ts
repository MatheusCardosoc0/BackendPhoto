import { Request, Response } from "express";
import { RegisterRequest } from "../../@types/interfaces/UserInterfaces";
import { RegisterService } from "../../services/user/registerService";

class RegisterController{
  async handle(req: Request, res: Response){

    const {name, email, password}: RegisterRequest = req.body

    const service = new RegisterService()

    if(!req.file) throw new Error("Error upload File")
    else {

      const {originalname, filename: banner} = req.file

      

      const register = await service.execute({
        name,
        email,
        banner,
        password
      })

      return res.json(register)
    }

    
  }
}

export {RegisterController}