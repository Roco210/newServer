import mongoose from "mongoose";

const ticketSchema =new mongoose.Schema(
    {
        code:{
            type:mongoose.Types.ObjectId(),
            required:true,
            unique:true},
        purchase_datetime:{
                type:Date,
                unique:true
            },
            amount:{
                type:Number
        },
        purchaser:{
            type:String
    }
    }
)

export default ticketmodel = mongoose.model('ticket',ticketSchema)