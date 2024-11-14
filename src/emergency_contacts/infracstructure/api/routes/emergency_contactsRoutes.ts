import  { Router } from "express";
import { registerController, deleteController, getAllController, getByIdController, updateController, getByUserIdController} from "../dependencies/dependencies";
import { TokenService } from "../../../../middleware/auth";


export const emergencyContactsRoutes = Router();


emergencyContactsRoutes.get('/all',TokenService.authenticateToken,getAllController.run.bind(getAllController));

emergencyContactsRoutes.get('/:id', TokenService.authenticateToken,getByIdController.run.bind(getByIdController));

emergencyContactsRoutes.get('/find/:id', TokenService.authenticateToken, getByUserIdController.handle.bind(getByUserIdController));

emergencyContactsRoutes.post('/register', TokenService.authenticateToken,registerController.run.bind(registerController));

emergencyContactsRoutes.delete('/delete/:id', TokenService.authenticateToken,deleteController.run.bind(deleteController));

emergencyContactsRoutes.put('/update/:id', TokenService.authenticateToken,updateController.run.bind(updateController)); 