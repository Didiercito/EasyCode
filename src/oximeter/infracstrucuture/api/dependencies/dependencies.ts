import { GetAllUseCase } from "../../../application/getAllUseCase";
import { SaveUseCaseOximeter } from "../../../application/saveUseCase";
import { UpdateUseCase } from "../../../application/updateUseCase";
import { GetAllController } from "../controllers/getAllController";
import { SaveController } from "../controllers/saveController";
import { UpdateController } from "../controllers/updateController";
import { MySQLOximeterRepository } from "../../adapters/oximeterAdapterMySQL";

const oximeterRepository = new MySQLOximeterRepository();

const getAllUseCase = new GetAllUseCase(oximeterRepository);
const saveUseCase = new SaveUseCaseOximeter(oximeterRepository);
const updateUseCase = new UpdateUseCase(oximeterRepository);

export const getAllController = new GetAllController(getAllUseCase);
export const saveController = new SaveController(saveUseCase);
export const updateController = new UpdateController(updateUseCase);