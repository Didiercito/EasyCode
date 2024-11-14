import { Router } from "express";
import { deleteController, updateController, getAllController, getByIdController, registerController, getByUserIdController} from "../dependencies/dependencies";
import { TokenService } from "../../../../middleware/auth";

export const medicalHistoryRoutes = Router();


medicalHistoryRoutes.get('/all', TokenService.authenticateToken,getAllController.run.bind(getAllController));

medicalHistoryRoutes.get('/medical-history/:id', TokenService.authenticateToken,getByIdController.run.bind(getByIdController));

medicalHistoryRoutes.get('/find/:id', TokenService.authenticateToken, getByUserIdController.handle.bind(getByUserIdController));

medicalHistoryRoutes.post('/register-condition', TokenService.authenticateToken,registerController.run.bind(registerController));

medicalHistoryRoutes.put('/update/:id', TokenService.authenticateToken,updateController.run.bind(updateController));

medicalHistoryRoutes.delete('/delete/:id', TokenService.authenticateToken,deleteController.run.bind(deleteController));