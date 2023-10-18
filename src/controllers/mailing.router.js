
import {transporter} from '../services/nodemailer.js';



export const purchaseEmail= async (req, res) => {
    
    const prod=req.purchaseProds
    const total = prod.reduce((acc, p) => acc + p.total, 0);
    const prodMap=prod.map(p=>`<li>Producto:${p.title} Unidades: ${p.quantity}  precio: $${p.price} total: $${p.total}</li>`)
    const message = {
        from:"coder",
        to:`ricky@gmail.com`,
        subject:"ticket de compra",
        html:`
        <h1>Ticket de compra</h1>
        ${prodMap}
        <p>Total: $${total}</p>`
    };
    await transporter.sendMail(message)
res.status(200).redirect("/")
}



