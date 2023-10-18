import mongoose from "mongoose";

const cartSchema= new mongoose.Schema({
    
    products:
        [{type:mongoose.Schema.Types.ObjectId,
        ref:"product"}
    ]
    
})



export const cartModel = mongoose.model("cart",cartSchema)  