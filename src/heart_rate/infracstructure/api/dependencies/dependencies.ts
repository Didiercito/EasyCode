import { SaveUseCase } from "../../../application/saveUseCase";
import { GetAllUseCase } from "../../../application/getByIdUseCase";
import { GetByIdUseCase } from "../../../application/getAllUseCase";
import { SaveController } from "../controller/saveController";
import { GetAllController } from "../controller/getAllController";
import { GetByIdController } from "../controller/getByIdController";
import { MySQLHeartRateRepository } from "../../adapters/heart_rateAdapterMySQL";

const heartRateRepository = new MySQLHeartRateRepository();

const saveHeartRateUseCase = new SaveUseCase(heartRateRepository);
const getAllHeartRatesUseCase = new GetAllUseCase(heartRateRepository);
const getHeartRateByIdUseCase = new GetByIdUseCase(heartRateRepository);

export const saveHeartRateController = new SaveController(saveHeartRateUseCase);
export const getAllHeartRatesController = new GetAllController(getAllHeartRatesUseCase);
export const getHeartRateByIdController = new GetByIdController(getHeartRateByIdUseCase);