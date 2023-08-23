import {Router} from 'express';
import { completeTaskController, createTask, deletetask, getAllTasks, getTaskById, updateTaskRecord, } from '../controller/taskController';
import { adminUser, authenticateuser } from '../utility/middleware';

const router = Router()

router.get("/",[authenticateuser,adminUser], getAllTasks)
router.get("/:id", authenticateuser,getTaskById)
router.post("/", authenticateuser,createTask)
router.put("/update/:id", authenticateuser,updateTaskRecord)
router.put("/complete/:id",authenticateuser,completeTaskController)
router.delete("/:id",authenticateuser,deletetask)



export default router