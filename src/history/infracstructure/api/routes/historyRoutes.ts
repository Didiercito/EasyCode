import { Router } from "express";
import { addSensorHistoryController, getAllHistoryController, getHistoryByDateRangeController, getHistoryBySensorTypeController, getHistoryForUserController, getSensorHistoryByIdController, deleteSensorHistoryController, updateSensorHistoryController } from "../dependencies/dependencies";
import { TokenService } from "../../../../middleware/auth";

export const historyRouter = Router()


historyRouter.get('/all', getAllHistoryController.handle.bind(getAllHistoryController));

historyRouter.get('/data-range', getHistoryByDateRangeController.handle.bind(getHistoryByDateRangeController))

historyRouter.get('/sensor-type', getHistoryBySensorTypeController.handle.bind(getHistoryBySensorTypeController));

historyRouter.get('/user', TokenService.authenticateToken,getHistoryForUserController.handle.bind(getHistoryForUserController));

historyRouter.get('/:id', getSensorHistoryByIdController.handle.bind(getSensorHistoryByIdController))

historyRouter.post('/add', addSensorHistoryController.handle.bind(addSensorHistoryController));

historyRouter.put('/update/:id', updateSensorHistoryController.handle.bind(updateSensorHistoryController));

historyRouter.delete('/delete/:id', deleteSensorHistoryController.handle.bind(deleteSensorHistoryController))
