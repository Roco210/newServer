import {ticketmodel} from "../../models/ticket.model.js"


class TicketMongo{

    async createTicket(ticket){
        try {
            const newTicket = await ticketmodel.create(ticket)
            console.log(newTicket)
            return newTicket
        }
        catch(error){return error}
    }

}
export const ticketMongo = new TicketMongo()