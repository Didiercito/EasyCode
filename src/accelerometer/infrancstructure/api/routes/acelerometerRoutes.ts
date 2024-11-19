import { Router } from "express";
import { getAllAcelerometerController, saveAcelerometerController, updateAcelerometerController } from "../dependencies/dependencies";

export const acelerometerRouter = Router();


acelerometerRouter.get('/all', getAllAcelerometerController.handle.bind(getAllAcelerometerController));

acelerometerRouter.post('/save', saveAcelerometerController.handle.bind(saveAcelerometerController));

acelerometerRouter.put('/update/:id', updateAcelerometerController.handle.bind(updateAcelerometerController));

