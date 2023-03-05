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

// src/services/user/registerService.ts
var registerService_exports = {};
__export(registerService_exports, {
  RegisterService: () => RegisterService
});
module.exports = __toCommonJS(registerService_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/user/registerService.ts
var import_bcryptjs = require("bcryptjs");
var RegisterService = class {
  async execute({ banner, email, name, password }) {
    const verify = await prisma.user.findFirst({
      where: {
        email
      }
    });
    if (verify)
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterService
});
