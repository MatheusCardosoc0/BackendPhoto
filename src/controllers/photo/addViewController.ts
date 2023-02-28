import { Request, Response } from "express";
import { AddViewRequest } from "../../@types/interfaces/PhotosInterfaces";
import { AddViewService } from "../../services/photo/addViewService";

class AddViewController{
  async handle(req: Request, res: Response){

    const {photo_id}: AddViewRequest = req.body

    const service = new AddViewService()

    const addView = await service.execute({
      photo_id
    })

    return res.json(addView)
  }
}

export {AddViewController}