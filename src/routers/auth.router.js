import { Router } from "express";
import { register, login, getMe} from "../../data/auth_controller.js";
import { displayRegister, displayLogin } from "../../data/main_controller.js";
import { authenticateToken } from "../middlewares/authenticateToken.js"
import { isAdmin } from "../middlewares/isAdmin.middelware.js";

export const authRouter = Router();

authRouter.get("/auth/register", displayRegister);
authRouter.get("/auth/login", displayLogin);
authRouter.post("/api/auth/register", register);
authRouter.post("/api/auth/login", login);
authRouter.get("/api/auth/me", authenticateToken, getMe);
authRouter.get("/api/createHero", authenticateToken, isAdmin, getMe);