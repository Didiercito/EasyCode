import { AddSensorHistoryUseCase } from "../../../application/addSensorHistoryUseCase";
import { DeleteSensorHistoryUseCase } from "../../../application/deleteSensorHistoryUseCase";
import { GetAllHistoryUseCase } from "../../../application/getAllHistoryUseCase";
import { GetHistoryByDateRangeUseCase } from "../../../application/getHistoryByDateRangeUseCase";
import { GetHistoryBySensorTypeUseCase } from "../../../application/getHistoryBySensorTypeUseCase";
import { GetHistoryForUserUseCase } from "../../../application/getHistoryForUserUseCase";
import { GetSensorHistoryByIdUseCase } from "../../../application/getSensorHistoryByIdUseCase";
import { UpdateSensorHistoryUseCase } from "../../../application/updateSensorHistoryUseCase";
import { AddSensorHistoryController } from "../controllers/addSensorHistoryController";
import { DeleteSensorHistoryController } from "../controllers/deleteSensorHistoryController";
import { GetAllSensorHistoryController } from "../controllers/getAllHistoryController";
import { GetHistoryByDateRangeController } from "../controllers/getHistoryByDateRangeController";
import { GetHistoryBySensorTypeController } from "../controllers/getHistoryBySensorTypeController";
import { GetHistoryForUserController } from "../controllers/getHistoryForUserController";
import { GetSensorHistoryByIdController } from "../controllers/getSensorHistoryByIdController";
import { UpdateSensorHistoryController } from "../controllers/updateSensorHistoryController";
import { MySQLSensorHistoryRepository } from "../../adapters/historyAdapterMySQL";



const sensorHistoryRepository = new MySQLSensorHistoryRepository();

const addSensorHistoryUseCase = new AddSensorHistoryUseCase(sensorHistoryRepository);
const deleteSensorHistoryUseCase = new DeleteSensorHistoryUseCase(sensorHistoryRepository);
const getAllHistoryUseCase = new GetAllHistoryUseCase(sensorHistoryRepository);
const getHistoryByDateRangeUseCase = new GetHistoryByDateRangeUseCase(sensorHistoryRepository);
const getHistoryBySensorTypeUseCase = new GetHistoryBySensorTypeUseCase(sensorHistoryRepository);
const getHistoryForUserUseCase = new GetHistoryForUserUseCase(sensorHistoryRepository);
const getSensorHistoryByIdUseCase = new GetSensorHistoryByIdUseCase(sensorHistoryRepository);
const updateSensorHistoryUseCase = new UpdateSensorHistoryUseCase(sensorHistoryRepository);

export const addSensorHistoryController = new AddSensorHistoryController(addSensorHistoryUseCase);
export const deleteSensorHistoryController = new DeleteSensorHistoryController(deleteSensorHistoryUseCase);
export const getAllHistoryController = new GetAllSensorHistoryController(getAllHistoryUseCase);
export const getHistoryByDateRangeController = new GetHistoryByDateRangeController(getHistoryByDateRangeUseCase);
export const getHistoryBySensorTypeController = new GetHistoryBySensorTypeController(getHistoryBySensorTypeUseCase);
export const getHistoryForUserController = new GetHistoryForUserController(getHistoryForUserUseCase);
export const getSensorHistoryByIdController = new GetSensorHistoryByIdController(getSensorHistoryByIdUseCase);
export const updateSensorHistoryController = new UpdateSensorHistoryController(updateSensorHistoryUseCase);

