interface CreatePhotoRequest{
  title: string
  photo: string
  description: string
  userId: string
  categoryId: string
}

interface AddViewRequest{
  photo_id: string
}

export {CreatePhotoRequest, AddViewRequest}