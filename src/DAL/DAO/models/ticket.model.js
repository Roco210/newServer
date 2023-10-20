import mongoose  from "mongoose";

const ticketSchema = new mongoose.Schema(

    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        purchase_datetime: {
            type: Date,
            unique: true
        },
        amount: {
            type: Number
        },
        purchaser: {
            type: String

        }
    }
)

export const ticketmodel = mongoose.model('ticket', ticketSchema)