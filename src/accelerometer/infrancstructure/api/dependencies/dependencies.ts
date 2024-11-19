import { GetAllUseCase } from "../../../application/getAllUseCase";
import { SaveAcelerometerUseCase } from "../../../application/saveUseCase";
import { UpdateUseCase } from "../../../application/updateUseCase";
import { GetAllAcelerometerController } from "../controllers/getAllUseCase";
import { SaveAcelerometerController } from "../controllers/saveController";
import { UpdateAcelerometerController } from "../controllers/updateController";
import { MySQLAcelerometerRepository } from "../../adapters/acelerometerAdaptersMySQL";


const acelerometerRepository = new MySQLAcelerometerRepository();

const getAllUseCase = new GetAllUseCase(acelerometerRepository);
const saveAcelerometerUseCase = new SaveAcelerometerUseCase(acelerometerRepository);
const updateUseCase = new UpdateUseCase(acelerometerRepository);

export const getAllAcelerometerController = new GetAllAcelerometerController(getAllUseCase);
export const saveAcelerometerController = new SaveAcelerometerController(saveAcelerometerUseCase);
export const updateAcelerometerController = new UpdateAcelerometerController(updateUseCase);