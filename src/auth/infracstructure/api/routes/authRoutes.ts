import { Router } from "express";
import { getByEmailController, loginController, registerController } from "../dependencies/dependencies";


export const authRouter = Router();

authRouter.post('/register', registerController.run.bind(registerController));

authRouter.post('/login', loginController.run.bind(loginController));

authRouter.get('/find-by-correo/:correo', getByEmailController.run.bind(getByEmailController));

