"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/user/userDetailController.ts
var userDetailController_exports = {};
__export(userDetailController_exports, {
  UserDetailController: () => UserDetailController
});
module.exports = __toCommonJS(userDetailController_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserDetailController
});
