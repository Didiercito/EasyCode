import { Router } from "express";
import { saveHeartRateController, getAllHeartRatesController,  updateController} from "../dependencies/dependencies";


export const HeartRateRouter = Router();

HeartRateRouter.get('/all', getAllHeartRatesController.handle.bind(getAllHeartRatesController));

HeartRateRouter.post('/save', async (req, res, next) => {
    try {
        await saveHeartRateController.handle(req, res);
    } catch (error) {
        next(error);
    }
});


HeartRateRouter.put('/update/:id', updateController.handle.bind(updateController));

