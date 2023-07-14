import express from "express";
import { deleteTask, getAllTasks, newTask, updateTask } from "../controllers/tasks.js";
import { validateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new",validateUser,newTask)

router.get("/all",validateUser,getAllTasks)

router.route("/:id").put(validateUser,updateTask).delete(validateUser,deleteTask)


export default router;