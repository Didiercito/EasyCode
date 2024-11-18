import { GetAllUseCase } from "../../../application/getAllUseCase";
import { SaveUseCaseBodyTemperature } from "../../../application/saveUseCase";
import { UpdateUseCase } from "../../../application/updateUseCase";
import { GetAllController } from "../controllers/getAllController";
import { SaveControllerBodyTemperature } from "../controllers/saveController";
import { UpdateController } from "../controllers/updateController";
import { MySQLBodyTemperatureRepository } from "../../adapters/body_temperatureAdapterMySQL";


const bodyTemperatureRepository = new MySQLBodyTemperatureRepository();

const getAllBodyTemperaturesUseCase = new GetAllUseCase(bodyTemperatureRepository);
const saveBodyTemperatureUseCase = new SaveUseCaseBodyTemperature(bodyTemperatureRepository);
const updateBodyTemperatureUseCase = new UpdateUseCase(bodyTemperatureRepository);

export const getAllController = new GetAllController(getAllBodyTemperaturesUseCase);
export const saveController = new SaveControllerBodyTemperature(saveBodyTemperatureUseCase);
export const updateController = new UpdateController(updateBodyTemperatureUseCase);