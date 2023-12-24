
import {transporter} from '../services/nodemailer.js';



export const purchaseEmail= async (req, res) => {
    const user=req.userEmail
    const prod=req.purchaseProds
    const code =req.code
    const total = prod.reduce((acc, p) => acc + p.total, 0);
    const prodMap=prod.map(p=>`<li>Producto:${p.title} Unidades: ${p.quantity}  precio: $${p.price} total: $${p.total}</li>`)
    const message = {
        from:"coder",
        to:user.email,
        subject:"ticket de compra",
        html:`
        <h1>Ticket de compra</h1>
        <h2>Hola ${user.first_name} tu compra se realizo con exito</h2>
        <h3>Codigo de compra: ${code}</h3>
        ${prodMap}
        <p>Total: $${total}</p>`
    };
    await transporter.sendMail(message)
res.status(200).redirect("/")
}

export const changePassMail= async (email,token) => {
    const correo =email
    const message = {
        from:"coder",
        to:correo,
        subject:"cambio de contraseña",
        html:`
        <h1>cambia tu calve aqui</h1>
        <h2>accede al siguiente enlace para cambiar de clave</h2>
        <a href="http://localhost:8080/api/users/modifylinkpass/${token}">
        <button type="button" class="btn btn-success">Cambiar contraseña</button>
        <a>
        `
    };
    console.log(message)
    await transporter.sendMail(message)

}


