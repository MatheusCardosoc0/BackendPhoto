import { Request, Response } from "express";
import { AllPhotosService } from "../../services/photo/allPhotosService";

class AllPhotosController{
  async handle(req: Request, res: Response){
    const service = new AllPhotosService()

    const allPhotos = await service.execute()

    return res.json(allPhotos)
  }
}

export {AllPhotosController}