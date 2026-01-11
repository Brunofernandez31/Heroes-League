import { Router } from "express";
import { register, login } from "../../data/auth_controller.js";
import { displayRegister, displayLogin } from "../../data/main_controller.js"

export const authRouter = Router();

authRouter.get("/auth/register", displayRegister);
authRouter.get("/auth/login", displayLogin);
authRouter.post("/api/auth/register", register);
authRouter.post("/api/auth/login", login);