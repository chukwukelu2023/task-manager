import { Request,Response } from "express";
import {getAllUsers, getUserById, removeUser, saveUser, updateUser} from "../services/userService"
import { IUser } from "../interface/userInterface";


export const createUser = async (req:Request, res:Response) =>{
    try {
       const user = await saveUser(req.body)
       return res.status(201).send(user)
    } catch (error) {
        return res.send(error)
    }
}

export const getUsers =async (req:Request, res:Response) => {
    try {
        const users = await getAllUsers()
        return res.status(200).send(users)
    } catch (error) {
        return res.send(error)
    }
}

export const getCurrentUser = async(req:Request,res:Response)=>{
    try {
        const id = req.user
        const user = await getUserById(+id)
       return res.status(200).send(user)
    } catch (error) {
        return res.send(error)
    }

}

export const getUser =async (req:Request, res:Response) => {
    
    try {
        const id = req.params.id
        const user = await getUserById(+id)
        if(!user){
            return res.status(404).send({message:"User Does not Exist"})
        }
        res.render('users',{users:user})
       //return res.status(200).send(user)
    } catch (error) {
        return res.send(error)
    }
}

export const updateOneUser = async (req:Request, res:Response)=>{
    try{
        const id = req.params.id
        const user = await updateUser(+id,req.body)
        return res.status(200).send(user)
    }catch(error){
        return res.send(error)
    }
}

export const deleteUser = async (req:Request,res:Response)=>{
    try {
        const id = req.params.id
        await removeUser(+id)
        return res.status(200).send({message:"User Deleted Succesfully"})
    } catch (error) {
        return res.send(error)
    }
}