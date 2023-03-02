import { PhotoByCategoryRequest } from "../../@types/interfaces/PhotosInterfaces";
import { prisma } from "../../utils/prisma";

class PhotosByCategoryService{
  async execute({categoryId}: PhotoByCategoryRequest){
    const photos = await prisma.photos.findMany({
      where: {
        categoryId
      },
      orderBy: {
        views: 'desc'
      },
      include:{
        Category: true,
        User: true
      }
    })

    return photos
  }
}

export {PhotosByCategoryService}