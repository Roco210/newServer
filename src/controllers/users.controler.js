
import {userMongo} from "../DAL/DAO/manager/users/usersManagerMongo.js";
import { hashdata, generateToken,generateTokenXHour, verifyToken, compareHash  } from "../utils.js";
import { userDto, userDtoPass } from "../DAL/DTO/user.dto.js";
import { changePassMail } from "../controllers/mailing.router.js"




export const Singup = async (req, res) => {
    const data = req.user
    const userExist = await userMongo.findUser(data.email)
    if (userExist) {
        res.status(400).json({ messge: "plase use other mail" })
        return
    }
    const hashPassword = await hashdata(data.password)
    const user = await userMongo.createUser({ ...req.body, password: hashPassword })
    res.status(200).json({ message: `user created: ${user}` })
    
}

export const forgotPassword=async(req,res)=>{
    const user = req.userExist
    const {correo}=req.body
    const token =  generateTokenXHour(userDtoPass(user),60)
    console.log(token)
    changePassMail(correo,token)
    res.status(200).redirect("/")

}



export const userLogIn = async (req, res) => {
    const token =  generateToken(userDto(req.user))
        res.cookie("token", token, {httpOnly:true,maxAge:60*30*1000}).status(200).redirect("/")
}

export const userLogOut = async (req, res) => {
    req.session.destroy()
    res.clearCookie("token").clearCookie("connect.sid").redirect("/log")
}

export const createNewPass = async(req,res)=>{
    const {newPass} =req.body
    const {token} = req.cookies
    const dato =verifyToken(token)
    console.log(dato)
    if (dato==null){
        res.status(500).redirect("/forgotPass")
        return
    }
    const correo =dato.user.email
    const userDb = await userMongo.findUser(correo)
    console.log(userDb.password)
    const checkNewPass= await compareHash(newPass,userDb.password)
    if(!checkNewPass){
        const hashPassword = await hashdata(newPass)
        userDb.password =hashPassword
        console.log(userDb.password)
        await userMongo.modifyUser(userDb)
        console.log("pass cambiada")
        res.status(200).clearCookie("token").clearCookie("connect.sid").redirect("/log")
    }else{
        res.json({mesage:"no puedes repetir la misma clave"})
    }
}

