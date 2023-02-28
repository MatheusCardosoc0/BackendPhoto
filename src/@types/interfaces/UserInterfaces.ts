interface RegisterRequest{
  name: string
  password: string
  email: string
  banner: string
}

interface LoginRequest{
  email: string
  password: string
}

interface DetailUserService{
  user_id: string
}

export {LoginRequest, RegisterRequest, DetailUserService}