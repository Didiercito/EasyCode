import e, { Router } from "express";
import { registerController, deleteController, getAllController, getByIdController, updateController } from "../dependencies/dependencies";

export const emergencyContacts = Router();


emergencyContacts.get('/get-all', getAllController.run.bind(getAllController));

emergencyContacts.get('/:id', getByIdController.run.bind(getByIdController));

emergencyContacts.post('/register', registerController.run.bind(registerController));

emergencyContacts.delete('/delete/:id', deleteController.run.bind(deleteController));

emergencyContacts.put('/update/:id', updateController.run.bind(updateController));