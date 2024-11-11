import { Router } from "express";
import { registerDoctorController, deleteDoctorController, getAllDoctorController, getByIdDoctorController,  updateDoctorController} from "../dependencies/dependencies";


export const doctorRoutes = Router()


doctorRoutes.get('/get-all', getAllDoctorController.run.bind(getAllDoctorController));

doctorRoutes.get('/:id', getByIdDoctorController.run.bind(getByIdDoctorController));

doctorRoutes.post('/register', registerDoctorController.run.bind(registerDoctorController));

doctorRoutes.delete('/delete/:id', deleteDoctorController.run.bind(deleteDoctorController));

doctorRoutes.put('/update/:id', updateDoctorController.run.bind(updateDoctorController));