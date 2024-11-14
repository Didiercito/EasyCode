import { DeleteUseCase } from "../../../application/deleteUseCase";
import { GetAllUseCase } from "../../../application/getAllUseCase";
import { GetByIdUseCase } from "../../../application/getByIdUseCase";
import { RegisterUseCase } from "../../../application/registrateUseCase";
import { UpdateUseCase } from "../../../application/updateUseCase";
import { GetByUserIdUseCase } from "../../../application/getByUserIdUseCase";
import { DeleteController } from "../controllers/deleteController";
import { GetAllController } from "../controllers/getAllController";
import { GetByIdController } from "../controllers/getByIdController";
import { RegisterController } from "../controllers/registerController";
import { UpDateController } from "../controllers/updateController";
import { GetByUserIdController } from "../controllers/getByUserIdController";
import { MySQLMedicalHistoryRepository } from "../../adapters/medical_historyAdapterMySQL";


const medicalHistoryRepository = new MySQLMedicalHistoryRepository();

const deleteUseCase = new DeleteUseCase(medicalHistoryRepository);
const getAllUseCase = new GetAllUseCase(medicalHistoryRepository);
const getByIdUseCase = new GetByIdUseCase(medicalHistoryRepository);
const registerUseCase = new RegisterUseCase(medicalHistoryRepository);
const updateUseCase = new UpdateUseCase(medicalHistoryRepository);
const getByUserIdUseCase = new GetByUserIdUseCase(medicalHistoryRepository)

export const deleteController = new DeleteController(deleteUseCase);
export const getAllController = new GetAllController(getAllUseCase);
export const getByIdController = new GetByIdController(getByIdUseCase);
export const registerController = new RegisterController(registerUseCase);
export const updateController = new UpDateController(updateUseCase);
export const getByUserIdController = new GetByUserIdController (getByUserIdUseCase);