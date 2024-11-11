import { RegisterUseCase } from "../../../application/registerUseCase";
import { DeleteUseCase } from "../../../application/deleteUseCase";
import { GetByIdUseCase } from "../../../application/getByIdUseCase";
import { GetAllUseCase } from "../../../application/getAllUseCase";
import { UpdateUseCase } from "../../../application/updateUseCase";
import { RegisterController } from "../controllers/registerController";
import { DeleteController } from "../controllers/deleteController";
import { GetAllController } from "../controllers/getAllController";
import { GetByIdController } from "../controllers/getByIdController";
import { UpdateController } from "../controllers/updateController";
import { MySQLDoctorRepository } from "../../adapters/doctorAdapterMySQL";


const doctorRepository = new MySQLDoctorRepository();

const registerUseCase = new RegisterUseCase(doctorRepository);
const deleteUseCase = new DeleteUseCase(doctorRepository);
const getByIdUseCase = new GetByIdUseCase(doctorRepository);
const getAllUseCase = new GetAllUseCase(doctorRepository);
const updateUseCase = new UpdateUseCase(doctorRepository);

export const registerDoctorController = new RegisterController(registerUseCase);
export const deleteDoctorController = new DeleteController(deleteUseCase);
export const getByIdDoctorController = new GetByIdController(getByIdUseCase);
export const getAllDoctorController = new GetAllController(getAllUseCase);
export const updateDoctorController = new UpdateController(updateUseCase);