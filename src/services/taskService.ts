import ITask from "../interface/taskInterface";
import { Tasks } from "../models/task";

const saveTask = async(body:any)=>{
    const task = await Tasks.create(body)
    return task
}

const getTasks = async()=>{
    return await Tasks.findAll()
}

const getTask = async(id:number)=>{
    return await Tasks.findByPk(id)
    
}

const removeTask = async(task:Tasks)=>{
    await task.destroy()
    
}

const updateTask = async(id:number, body:any)=>{
    const task = await getTask(id)
    return task?.update(body)
}

const completeTaskService = async(id:number,userId:number)=>{
    const task = await getTask(id)
    return task?.update({status:"COMPLETED",dateCompleted:new Date()})
}

export {
    saveTask,
    getTask,
    getTasks,
    updateTask,
    removeTask,
    completeTaskService
}