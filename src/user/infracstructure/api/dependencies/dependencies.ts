import { DeleteUserUseCase } from "../../../application/deleteUseCase";
import { GetAllUseCase } from "../../../application/getAllUseCase";
import { GetByIdUseCase } from "../../../application/getByIdUseCase";
import { UpdateUserUseCase } from "../../../application/updateUseCase";
import { DeleteController } from "../controllers/deleteController";
import { GetAllController } from "../controllers/getAllController";
import { GetByIdController } from "../controllers/getByIdController";
import { UpdateController } from "../controllers/updateController";
import { MySQLUserAdapter } from "../../adapters/userAdapterMySQL";

const userRepository = new MySQLUserAdapter();

const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const getAllUseCase = new GetAllUseCase(userRepository);
const getByIdUseCase = new GetByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);

export const deleteController = new DeleteController(deleteUserUseCase);
export const getAllController = new GetAllController(getAllUseCase);
export const getByIdController = new GetByIdController(getByIdUseCase);
export const updateController = new UpdateController(updateUserUseCase);