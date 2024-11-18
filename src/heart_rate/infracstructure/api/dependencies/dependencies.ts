import { SaveUseCase } from "../../../application/saveUseCase";
import { GetAllUseCase } from "../../../application/getAllUseCase";
import { UpdateUseCase } from "../../../application/updateUseCase";
import { SaveController } from "../controller/saveController";
import { GetAllController } from "../controller/getAllController";
import { UpdateController } from "../controller/updateController";
import { MySQLHeartRateRepository } from "../../adapters/heart_rateAdapterMySQL";

const heartRateRepository = new MySQLHeartRateRepository();


const saveHeartRateUseCase = new SaveUseCase(heartRateRepository);
const getAllHeartRatesUseCase = new GetAllUseCase(heartRateRepository);
const updateUseCase = new UpdateUseCase(heartRateRepository);
 
export const saveHeartRateController = new SaveController(saveHeartRateUseCase);
export const getAllHeartRatesController = new GetAllController(getAllHeartRatesUseCase);
export const updateController = new UpdateController(updateUseCase);