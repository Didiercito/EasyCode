import { Router } from "express";
import { getAllController, saveController, updateController } from "../dependencies/dependencies";


export const bodyTemperatureRouter = Router();

bodyTemperatureRouter.get('/all', getAllController.handle.bind(getAllController));

bodyTemperatureRouter.post('/save', saveController.handle.bind(saveController));

bodyTemperatureRouter.put('/update/:id', updateController.handle.bind(updateController));