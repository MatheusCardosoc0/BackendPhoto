import { prisma } from "../../utils/prisma";

class AllPhotosService{
  async execute(){
    const allPhotos = await prisma.photos.findMany({
      orderBy: {
        views: 'desc'
      },
      include: {
        Category: true,
        User: true
      }
    })

    return allPhotos
  }
}

export {AllPhotosService}