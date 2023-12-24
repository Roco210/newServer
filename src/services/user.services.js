import {userMongo} from "../DAL/DAO/manager/users/usersManagerMongo.js"
import {verifyToken} from "../utils.js"

export const checkData =(req, res,next) => {
    const { first_name,last_name, email, age, password } = req.body
    if (!first_name|| !last_name || !email || !age || !password ) {

        res.status(400).json({ messge: "faltan datos" })
        return
    }
    const user = req.body
    req.user = user
    next()
}

export const userInfo= (user)=>{

    const objUser=[{
        first_name:user.first_name?user.first_name.toUpperCase():"null",
        rol:user.isAdmin ? user.isAdmin.toUpperCase():"USER"
    }]
    return objUser
}

export const authLog =  (roles)=>{
  
        return (req,res,next)=>{
            const rol = req.user.user.isAdmin
            console.log(rol)
            if(!roles.includes(rol)){
                res.status(401).json({message:"no tienes permisos"})
                return}
            next()
    }
    
} 

export const changePass =async(req,res,next)=>{
    const {correo}=req.body
    const userExist= await userMongo.findUser(correo)
    if (userExist){
        req.userExist=userExist
        next()
    }else{
        res.redirect("/forgotPass")
    }
    
}

export const checklink = async(req,res)=>{
    const {jwt}=req.params
    const dato =verifyToken(jwt)
    if (dato==null){
        res.status(500).redirect("/forgotPass")
    }else{res.cookie("token",jwt).status(200).redirect("/changepass")
}
    

}
    
    
    

