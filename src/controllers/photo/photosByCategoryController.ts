import { Request, Response } from "express";
import { PhotosByCategoryService } from "../../services/photo/photosByCategoryService";

class PhotosByCategoryController{
  async handle(req: Request, res: Response){

    const categoryId = req.params.categoryId as string

    const service = new PhotosByCategoryService()

    const photosByCategory = await service.execute({
      categoryId
    })

    return res.json(photosByCategory)
  }
}

export {PhotosByCategoryController}