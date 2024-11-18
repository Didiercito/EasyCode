import { Router } from "express";
import { saveHeartRateController, getAllHeartRatesController,  updateController} from "../dependencies/dependencies";


export const HeartRateRouter = Router();

HeartRateRouter.get('/all', getAllHeartRatesController.handle.bind(getAllHeartRatesController));

HeartRateRouter.post('/save', saveHeartRateController.handle.bind(saveHeartRateController));

HeartRateRouter.put('/update/:id', updateController.handle.bind(updateController));

