import { Router } from "express";
import { deleteController, updateController, getAllController, getByIdController, registerController } from "../dependencies/dependencies";


export const medical_history = Router();


medical_history.get('/all', getAllController.run.bind(getAllController));

medical_history.get('/medical-history/:id', getByIdController.run.bind(getByIdController));

medical_history.post('/register-condition', registerController.run.bind(registerController));

medical_history.put('/update/:id', updateController.run.bind(updateController));

medical_history.delete('/delete/:id', deleteController.run.bind(deleteController));