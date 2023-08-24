import { Request,Response } from "express";
import {completeTaskService, getTask,getTasks,removeTask,saveTask, updateTask} from '../services/taskService'
import ITask from "../interface/taskInterface";

export const createTask = async(req:Request,res:Response)=>{
    const userId = req.user
    const body = req.body
    try {
        const task = await saveTask({...body,userId})
        return res.status(201).send(task)
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'Error Creating Task'})
    }
}

export const getAllTasks = async(req:Request,res:Response)=>{
    try {
        const tasks = await getTasks()
        return res.status(200).send(tasks)
    } catch (error) {
        return res.send(error)
    }
}

export const getTaskById = async(req:Request,res:Response)=>{
    const userId = req.user
    const body = req.body
    try {
        const task = await getTask(+req.params.id)
        if(!task){
            return res.status(404).send({message:"Task does not exist"})
        }
        return res.status(200).send(task)
    } catch (error) {
        return res.send(error)
    }
}

export const updateTaskRecord = async(req:Request,res:Response)=>{
    const {id} = req.params
    const savedtask = await getTask(+id) as ITask
    const body = req.body
    if(savedtask && savedtask.status === 'COMPLETED'){
        return res.status(400).send({message:'Cannot Update Status of Completed task'})
    }
    try {
        const updatedTask = await updateTask(+id,body)
        return res.status(200).send(updatedTask)
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Error Updating Task"})
    }
}

export const deletetask = async(req:Request,res:Response)=>{
    try {
        const task = await getTask(+req.params.id)
        if(!task){
            return res.status(404).send({message:"Task does not exist"})
        }
        await removeTask(task)
        return res.status(200).send({message:"Task removed succesfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Error deleting task"})
    }
}

export const completeTaskController = async(req:Request,res:Response)=>{
    const userId = req.user
    try {
        await completeTaskService(+req.params.id,userId)
        return res.status(200).send({message:"Task completed succesfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Error completing task"})
    }
}
