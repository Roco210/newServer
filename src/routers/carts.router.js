import { Router } from "express";
import { createCart,purchase,serchCart,updateCart,updateProdInCart,addProdInCart, deleteCart,deleteProdCart} from "../controllers/carts.controler.js";
import { purchaseEmail } from "../controllers/mailing.router.js";


const router=Router()

router.post("/",createCart)

router.get("/:cid", serchCart)

router.post("/:cid/product/:pid",updateCart)

router.delete('/:cid/product/:pid',deleteProdCart)

router.delete('/:cid',deleteCart)

router.put('/:cid/product/:pid',updateProdInCart)

router.put('/:cid',addProdInCart)

router.get("/:cid/purchase",purchase,purchaseEmail)


export default router;