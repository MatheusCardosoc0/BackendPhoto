import { CreatePhotoRequest } from "../../@types/interfaces/PhotosInterfaces";
import { prisma } from "../../utils/prisma";

class CreatePhotoService{
  async execute({
    categoryId,
    description,
    photo,
    title,
    userId
  }: CreatePhotoRequest){
    const createPhoto = await prisma.photos.create({
      data: {
        photo,
        title,
        categoryId,
        userId,
        description
      }
    })

    return createPhoto
  }
}

export {CreatePhotoService}