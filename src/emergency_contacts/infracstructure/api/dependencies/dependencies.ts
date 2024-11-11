import { RegisterUseCase } from "../../../application/registerUseCase";
import { GetByIdUseCase } from "../../../application/getByIdUseCase";
import { GetAllUseCase } from "../../../application/getAllUseCase";
import { DeleteUseCase } from "../../../application/deleteUseCase";
import { UpdateUseCase } from "../../../application/updateUseCase";
import { RegisterController } from "../controllers/registerController";
import { GetByIdController } from "../controllers/getByIdController";
import { GetAllController } from "../controllers/getAllController";
import { DeleteController } from "../controllers/deleteController";
import { UpdateController } from "../controllers/updateController";
import { MySQLEmergencyContactsRepository } from "../../adapters/emergency_contactsAdapterMySQL";

const emergencyContactsRepository = new MySQLEmergencyContactsRepository();

const registerUseCase = new RegisterUseCase(emergencyContactsRepository);
const getByIdUseCase = new GetByIdUseCase(emergencyContactsRepository);
const getAllUseCase = new GetAllUseCase(emergencyContactsRepository);
const deleteUseCase = new DeleteUseCase(emergencyContactsRepository);
const updateUseCase = new UpdateUseCase(emergencyContactsRepository);

export const registerController = new RegisterController(registerUseCase);
export const getByIdController = new GetByIdController(getByIdUseCase);
export const getAllController = new GetAllController(getAllUseCase);
export const deleteController = new DeleteController(deleteUseCase);
export const updateController = new UpdateController(updateUseCase);