import { Router } from "express";
import { registerDoctorController, deleteDoctorController, getAllDoctorController, getByIdDoctorController,  updateDoctorController, getByUserIdController} from "../dependencies/dependencies";
import { TokenService } from "../../../../middleware/auth";

export const doctorRoutes = Router()


doctorRoutes.get('/all', TokenService.authenticateToken,getAllDoctorController.run.bind(getAllDoctorController));

doctorRoutes.get('/:id', TokenService.authenticateToken,getByIdDoctorController.run.bind(getByIdDoctorController));

doctorRoutes.get('/find/:id', TokenService.authenticateToken, getByUserIdController.handle.bind(getByUserIdController))

doctorRoutes.post('/register', TokenService.authenticateToken,registerDoctorController.run.bind(registerDoctorController));

doctorRoutes.delete('/delete/:id', TokenService.authenticateToken,deleteDoctorController.run.bind(deleteDoctorController));

doctorRoutes.put('/update/:id', TokenService.authenticateToken,updateDoctorController.run.bind(updateDoctorController));