import { Router } from "express";
import { getAllController, saveController, updateController } from "../dependencies/dependencies";


export const oximeterRouter = Router();


oximeterRouter.get('/all', getAllController.handle.bind(getAllController));

oximeterRouter.post('/save', saveController.handle.bind(saveController));

oximeterRouter.put('/update/:id', updateController.handle.bind(updateController));