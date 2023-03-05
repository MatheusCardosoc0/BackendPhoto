import { Router } from "express";
import { RegisterController } from "./controllers/user/registerController";
import uploadConfig from './config/multer'
import multer from "multer";
import { LoginController } from "./controllers/user/loginController";
import { UserDetailController } from "./controllers/user/userDetailController";
import { isAuthAuthenticated } from "./middlewares/isAuthenticated";
import { AllCategoriesController } from "./controllers/category/allCategoriesController";
import { CreatePhotoController } from "./controllers/photo/createPhotoController";
import { AddViewController } from "./controllers/photo/addViewController";
import { AllPhotosController } from "./controllers/photo/allPhotosController";
import path from 'path'
import { PhotosByCategoryController } from "./controllers/photo/photosByCategoryController";

const router = Router()

const upload = multer(uploadConfig.upload('./tmp'))

//---- ROUTES USER ----

router.post('/register',upload.single('file'), new RegisterController().handle)

router.post('/login', new LoginController().handle)

router.get('/user/details', isAuthAuthenticated, new UserDetailController().handle)

//---- ROUTES CATEGORY ----

router.get('/categories', new AllCategoriesController().handle)

//---- ROUTES PHOTO ----

router.post('/photo', isAuthAuthenticated,upload.single('file'), new CreatePhotoController().handle)

router.put('/photo/view', new AddViewController().handle)

router.get('/photos', new AllPhotosController().handle)

router.get('/photos/:categoryId', new PhotosByCategoryController().handle)

router.get('/photo/:nomeArquivo', (req, res) => {
  const nomeArquivo = req.params.nomeArquivo;
  const caminhoArquivo = path.join(__dirname, './tmp/', nomeArquivo);
  res.sendFile(caminhoArquivo);
});

//e

export {router}