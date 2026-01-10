import { Router } from "express";
import { register, login } from "../../data/auth_controller.js";

export const authRouter = Router();

authRouter.post("/api/auth/register", register);
authRouter.post("/api/auth/login", login);