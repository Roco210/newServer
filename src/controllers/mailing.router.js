
import {transporter} from '../services/nodemailer.js';



export const purchaseEmail= async (req, res) => {
    const user=req.userEmail
    const prod=req.purchaseProds
    const total = prod.reduce((acc, p) => acc + p.total, 0);
    const prodMap=prod.map(p=>`<li>Producto:${p.title} Unidades: ${p.quantity}  precio: $${p.price} total: $${p.total}</li>`)
    const message = {
        from:"coder",
        to:user.email,
        subject:"ticket de compra",
        html:`
        <h1>Ticket de compra</h1>
        <h2>Hola ${user.first_name} tu compra se realizo con exito</h2>
        ${prodMap}
        <p>Total: $${total}</p>`
    };
    await transporter.sendMail(message)
res.status(200).redirect("/")
}



