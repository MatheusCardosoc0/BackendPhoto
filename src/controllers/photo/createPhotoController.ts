import { Request, Response } from "express";
import { CreatePhotoRequest } from "../../@types/interfaces/PhotosInterfaces";
import { CreatePhotoService } from "../../services/photo/createPhotoService";

class CreatePhotoController{
  async handle(req: Request, res: Response){

    const {categoryId, description, title}: CreatePhotoRequest = req.body

    const userId = req.user_id

    const service = new CreatePhotoService()

    if(!req.file) throw new Error('Error uploadFile')
    else {

      const {originalname, filename: banner} = req.file

      const createPhoto = await service.execute({
        categoryId,
        description,
        photo: banner,
        title,
        userId
      })

      return res.json(createPhoto)
    }
  }
}

export {CreatePhotoController}