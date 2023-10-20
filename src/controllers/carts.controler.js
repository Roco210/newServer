import { cartMongo } from "../DAL/DAO/manager/cart/cartManagerMongo.js"
import { cartdata } from "../services/cart.services.js"
import { productMongo } from "../DAL/DAO/manager/product/productManagerMongo.js"


export const createCart = async (req, res) => {

    try {
        const cart = await cartMongo.getCarts()
        const cartId = cart

        /* newCartUser(cartId,email) */
        res.status(200).json({ mesage: 'Cart created' })
    }
    catch (error) { res.status(500).json({ error }) }
}

export const serchCart = async (req, res) => {
    let cid = req.params.cid
    if (cid.length != 24) {
        res.status(400).json({ mesage: "Put a correct Id" })
        return
    }
    try {
        const cart = await cartMongo.getCartById(cid)
        if (!cart || cart.name == "CastError") {
            res.status(400).json({ mesage: `no exist a cart whith id ${cid}` })
        } else { res.status(200).json(cart) }
    }
    catch (error) { res.status(500).json({ error }) }
}

export const deleteProdCart = async (req, res) => {

    try {
        const t = await cartMongo.delProdCart(cid, pid)

        res.status(200).json({ t })
    }
    catch (error) { res.status(500).json({ error }) }
}
export const deleteCart = async (req, res) => {
    const { cid } = req.params
    const delProds = await cartMongo.delAllprods(cid)
    res.status(200).json({ delProds })

}

export const updateProdInCart = async (req, res) => {
    const { cid, pid } = req.params
    const cant = req.body
    try {
        const t = await cartMongo.putquantity(cid, pid, cant)
        res.status(200).json({ mensage: 'se actualizo el prod' })
    }

    catch (error) { res.status(500).json({ error }) }
}


export const updateCart = async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    try {
        if (cid.length != 24) {
            res.status(400).json({ mesage: "Put a correct Cart Id" })
            return
        } if (pid.length != 24) {
            res.status(400).json({ mesage: "Put a correct Prod Id" })
            return
        }
        const cartUpdate = await cartMongo.updatecart(cid, pid)
        if (cartUpdate == "cart update") { res.status(200).json(cartUpdate) }
        else {
            res.status(400).json({ mesage: cartUpdate })
        }
    }
    catch (error) { res.status(500).json({ error }) }
}

export const addProdInCart = async (req, res) => {
    const { cid } = req.params
    const { prod } = req.body

    try {
        const t = await cartMongo.putProd(cid, prod)
        res.status(200).json({ t })
    }
    catch (error) { res.status(500).json({ error }) }
}


export const purchase = async (req, res, next) => {
    const { cid } = req.params
    if (!req.user) {
        res.status(400).json({ mesage: "no exist a user" })
    }else{const { email, first_name } = req.user
    const userdto = { email, first_name }
    const userCart = await cartdata(cid)
    const purchase = userCart.map(async e => {
        const prod = await productMongo.getproductById(e.id)
        if (prod.stock < e.quantity) {
            return {
                stock: 0,
                id: prod.id,
                quantity: e.quantity,
                title: prod.title
            }
        }
        else {
            prod.stock = prod.stock - e.quantity
            await productMongo.updateProduct(e.id, { stock: prod.stock })
            return {
                quantity: e.quantity,
                title: e.title,
                price: e.price,
                total: e.total
            }
        }
    })
    const validateStock = await Promise.all(purchase)
    const withOutStock = validateStock.filter(e => e.stock == 0)
    const purchaseProds = validateStock.filter(e => e.stock != 0)
    const totalAmount = purchaseProds.reduce((acc, p) => acc + p.total, 0);
    req.purchaseProds = purchaseProds
    req.userEmail = userdto
    req.totalAmount = totalAmount
    cartwhitoutstock(cid, withOutStock)

    next()}
    
}

const cartwhitoutstock = async (cid, withOutStock) => {
    await cartMongo.delAllprods(cid)

    withOutStock.forEach(async e => {
        const q = e.quantity
        for (let i = 0; i < q; i++) {
            await cartMongo.updatecart(cid, e.id)
        }
    }
    )

}