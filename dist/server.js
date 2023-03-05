"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express2 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_express_async_errors = require("express-async-errors");

// src/routes.ts
var import_express = require("express");

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/user/registerService.ts
var import_bcryptjs = require("bcryptjs");
var RegisterService = class {
  async execute({ banner, email, name, password }) {
    const verify2 = await prisma.user.findFirst({
      where: {
        email
      }
    });
    if (verify2)
      throw new Error("User already exist");
    const passwordHash = await (0, import_bcryptjs.hash)(password, 8);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
        banner
      },
      select: {
        email: true,
        name: true,
        banner: true
      }
    });
    return user;
  }
};

// src/controllers/user/registerController.ts
var RegisterController = class {
  async handle(req, res) {
    const { name, email, password } = req.body;
    const service = new RegisterService();
    if (!req.file)
      throw new Error("Error upload File");
    else {
      const { originalname, filename: banner } = req.file;
      const register = await service.execute({
        name,
        email,
        banner,
        password
      });
      return res.json(register);
    }
  }
};

// src/config/multer.ts
var import_multer = __toESM(require("multer"));
var import_crypto = __toESM(require("crypto"));
var import_path = require("path");
var multer_default = {
  upload(folder) {
    return {
      storage: import_multer.default.diskStorage({
        destination: (0, import_path.resolve)(__dirname, ".", folder),
        filename: (req, file, callback) => {
          const fileHash = import_crypto.default.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          return callback(null, fileName);
        }
      })
    };
  }
};

// src/routes.ts
var import_multer3 = __toESM(require("multer"));

// src/services/user/loginService.ts
var import_bcryptjs2 = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var LoginService = class {
  async execute({ email, password }) {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });
    if (!user)
      throw new Error("User not exist");
    const passwordMath = await (0, import_bcryptjs2.compare)(password, user.password);
    if (!passwordMath)
      throw new Error("User not exist");
    const token = (0, import_jsonwebtoken.sign)(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d"
      }
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  }
};

// src/controllers/user/loginController.ts
var LoginController = class {
  async handle(req, res) {
    const { email, password } = req.body;
    const service = new LoginService();
    const login = await service.execute({
      email,
      password
    });
    return res.json(login);
  }
};

// src/services/user/userDetailsService.ts
var UserDetailsService = class {
  async execute({ user_id }) {
    if (!user_id)
      throw new Error("user_id is required");
    const user = await prisma.user.findFirst({
      where: {
        id: user_id
      },
      select: {
        id: true,
        name: true,
        email: true,
        banner: true
      }
    });
    return user;
  }
};

// src/controllers/user/userDetailController.ts
var UserDetailController = class {
  async handle(req, res) {
    const user_id = req.user_id;
    const service = new UserDetailsService();
    const detailUser = await service.execute({
      user_id
    });
    return res.json(detailUser);
  }
};

// src/middlewares/isAuthenticated.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
function isAuthAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken)
    return res.status(401).end();
  const [, token] = authToken.split(" ");
  try {
    const { sub } = (0, import_jsonwebtoken2.verify)(token, process.env.JWT_SECRET);
    req.user_id = sub;
    return next();
  } catch (error) {
    return res.status(401).end();
  }
}

// src/services/category/allCategoriesService.ts
var AllCategoriesService = class {
  async execute() {
    const allCategories = await prisma.category.findMany();
    return allCategories;
  }
};

// src/controllers/category/allCategoriesController.ts
var AllCategoriesController = class {
  async handle(req, res) {
    const service = new AllCategoriesService();
    const allCategories = await service.execute();
    return res.json(allCategories);
  }
};

// src/services/photo/createPhotoService.ts
var CreatePhotoService = class {
  async execute({
    categoryId,
    description,
    photo,
    title,
    userId
  }) {
    const createPhoto = await prisma.photos.create({
      data: {
        photo,
        title,
        categoryId,
        userId,
        description
      }
    });
    return createPhoto;
  }
};

// src/controllers/photo/createPhotoController.ts
var CreatePhotoController = class {
  async handle(req, res) {
    const { categoryId, description, title } = req.body;
    const userId = req.user_id;
    const service = new CreatePhotoService();
    if (!req.file)
      throw new Error("Error uploadFile");
    else {
      const { originalname, filename: banner } = req.file;
      const createPhoto = await service.execute({
        categoryId,
        description,
        photo: banner,
        title,
        userId
      });
      return res.json(createPhoto);
    }
  }
};

// src/services/photo/addViewService.ts
var AddViewService = class {
  async execute({ photo_id }) {
    const valueView = await prisma.photos.findFirst({
      where: {
        id: photo_id
      }
    });
    const addView = await prisma.photos.update({
      where: {
        id: photo_id
      },
      data: {
        views: valueView?.views + 1
      }
    });
    return addView;
  }
};

// src/controllers/photo/addViewController.ts
var AddViewController = class {
  async handle(req, res) {
    const { photo_id } = req.body;
    const service = new AddViewService();
    const addView = await service.execute({
      photo_id
    });
    return res.json(addView);
  }
};

// src/services/photo/allPhotosService.ts
var AllPhotosService = class {
  async execute() {
    const allPhotos = await prisma.photos.findMany({
      orderBy: {
        views: "desc"
      },
      include: {
        Category: true,
        User: true
      }
    });
    return allPhotos;
  }
};

// src/controllers/photo/allPhotosController.ts
var AllPhotosController = class {
  async handle(req, res) {
    const service = new AllPhotosService();
    const allPhotos = await service.execute();
    return res.json(allPhotos);
  }
};

// src/routes.ts
var import_path2 = __toESM(require("path"));

// src/services/photo/photosByCategoryService.ts
var PhotosByCategoryService = class {
  async execute({ categoryId }) {
    const photos = await prisma.photos.findMany({
      where: {
        categoryId
      },
      orderBy: {
        views: "desc"
      },
      include: {
        Category: true,
        User: true
      }
    });
    return photos;
  }
};

// src/controllers/photo/photosByCategoryController.ts
var PhotosByCategoryController = class {
  async handle(req, res) {
    const categoryId = req.params.categoryId;
    const service = new PhotosByCategoryService();
    const photosByCategory = await service.execute({
      categoryId
    });
    return res.json(photosByCategory);
  }
};

// src/routes.ts
var router = (0, import_express.Router)();
var upload = (0, import_multer3.default)(multer_default.upload("./tmp"));
router.post("/register", upload.single("file"), new RegisterController().handle);
router.post("/login", new LoginController().handle);
router.get("/user/details", isAuthAuthenticated, new UserDetailController().handle);
router.get("/categories", new AllCategoriesController().handle);
router.post("/photo", isAuthAuthenticated, upload.single("file"), new CreatePhotoController().handle);
router.put("/photo/view", new AddViewController().handle);
router.get("/photos", new AllPhotosController().handle);
router.get("/photos/:categoryId", new PhotosByCategoryController().handle);
router.get("/photo/:nomeArquivo", (req, res) => {
  const nomeArquivo = req.params.nomeArquivo;
  const caminhoArquivo = import_path2.default.join(__dirname, "./tmp/", nomeArquivo);
  res.sendFile(caminhoArquivo);
});

// src/server.ts
var import_path3 = __toESM(require("path"));
var app = (0, import_express2.default)();
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
app.use(router);
app.use(
  "/files",
  import_express2.default.static(import_path3.default.resolve(__dirname, "./tmp"))
);
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});
app.listen(3333);
