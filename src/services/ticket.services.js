import { ticketMongo } from "../DAL/DAO/manager/ticket/ticketManagerMongo.js"
import randomstring from "randomstring"

export const createTicket = async (req, res,next) => {
    const totalAmount =req.totalAmount
    if(totalAmount===0)
    {res.redirect("/")}
    else{const date =Date()
    const code = randomstring.generate()
    const user = req.userEmail.email   
    const objTicket ={
        code:code,
        purchase_datetime:date,
        amount:totalAmount,
        purchaser:user
    }
    const ticket = await ticketMongo.createTicket(objTicket)
    req.code = code
    
    next()}
}

