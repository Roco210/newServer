import { userMongo } from "../DAL/DAO/manager/users/usersManagerMongo.js"
import { cartMongo } from "../DAL/DAO/manager/cart/cartManagerMongo.js"
import { createCart } from "../controllers/carts.controler.js"


export const cartdata = async (cartId) => {
    const cartList = await cartMongo.populateCart(cartId)
    const cartWithData = cartList.products
    const list = []
    cartWithData.map(e => {
        const find = list.find(t => t.id == e.id)
        if (find) {
            find.quantity = find.quantity + 1      
            find.total= find.price *find.quantity 
        }
        else {
            list.push(
                {
                    id: e.id,
                    title: e.title,
                    price: e.price,
                    total:e.price,
                    quantity: 1
                }
            )
        }
    })
    
    return list
}
export const totalCart = async (obj) => {
    const total = obj.reduce((acum, e) => acum + e.total, 0)
    return total
}

export const newCartUser = async (cartID, email) => {
    await userMongo.addCartToUser(cartID, email)
}

export const newCart= async(req,res,next)=>{
    const cart = await createCart()
    req.cart=cart
    next()
}


