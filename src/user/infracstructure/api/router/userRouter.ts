import { Router } from "express";
import { deleteController, updateController, getAllController, getByIdController } from "../dependencies/dependencies";

export const userRouter = Router()

userRouter.get('/all', getAllController.run.bind(getAllController));

userRouter.get('/:id', getByIdController.run.bind(getByIdController));

userRouter.put('/update/:id', updateController.run.bind(updateController));

userRouter.delete('/delete/:id', deleteController.run.bind(deleteController));