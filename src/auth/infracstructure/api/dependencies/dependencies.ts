import { GetByEmailUseCase } from "../../../application/getByEmailUseCase";
import { LoginUseCase } from "../../../application/loginUseCase";
import { RegisterUseCase } from "../../../application/registerUseCase";
import { GetByEmailController } from "../controllers/getByEmailController";
import { LoginController } from "../controllers/loginController";
import { RegisterController } from "../controllers/registerController";
import { AuthAdapterMySQL } from "../../adapters/authAdapterMySQL";


const authRepository = new AuthAdapterMySQL();

const getByEmailUseCase = new GetByEmailUseCase(authRepository);
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);

export const getByEmailController = new GetByEmailController(getByEmailUseCase);
export const loginController = new LoginController(loginUseCase);
export const registerController = new RegisterController(registerUseCase);