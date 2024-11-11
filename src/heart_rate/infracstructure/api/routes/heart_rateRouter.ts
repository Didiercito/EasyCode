import { Router } from "express";
import { saveHeartRateController, getAllHeartRatesController, getHeartRateByIdController } from "../dependencies/dependencies";

export const HeartRateRouter = Router();

HeartRateRouter.get('/all', getAllHeartRatesController.handle.bind(getAllHeartRatesController));

HeartRateRouter.post('/save', saveHeartRateController.handle.bind(saveHeartRateController));

HeartRateRouter.get('/:id', getHeartRateByIdController.handle.bind(getHeartRateByIdController));