import { Request,Response } from "express";
import jsonwebtoken from "jsonwebtoken"
import { findUserByEmail } from "../services/userService";
import { comparePassword } from "../utility/password";
import { IPayload, IUser } from "../interface/userInterface";
import { SECRETE } from "../utility/constants";
import { signToken } from "../utility/token";


export const loginUser = async (req:Request, res:Response)=>{
    const {email,password} = req.body
    const user = await findUserByEmail(email) as unknown as IUser
    if(!user){
        res.status(404).send("Invali Credentials")
    }
    const checkPassword = await comparePassword(password,user.password) 

    if(!checkPassword){
        res.status(404).send("Invali Credentials")
    }
    const payload:IPayload = {
        id: user.id,
        admin: user.isAdmin
    }
    const token = await signToken(payload)

    res.status(200).send({id:user.id,token})
}