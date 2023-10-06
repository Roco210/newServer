import {userMongo} from "../DAL/manager/users/usersManagerMongo.js"

export const checkData =(req, res,next) => {
    const { firstName, lastName, email, age, password } = req.body
    console.log(req.body)
    if (!firstName|| !lastName || !email || !age || !password ) {
        res.status(400).json({ messge: "faltan datos" })
        return
    }
    req.user = req.body.first_name.first_name
    next()
}

export const userLog =async (req, res,next) => {
    const {email,password}=req.body
    if (!email || !password) {
        res.status(400).json({ messge: "faltan datos" })}
    const userDb = await userMongo.findUser(email)
    req.user=userDb
    next()
}


export const userInfo= (user)=>{
    const objUser=[{
        first_name:user.first_name.toUpperCase() ,
        rol:user.isAdmin ? "ADMIN":"USER"
    }]
    return objUser
}