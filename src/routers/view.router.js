import { Router } from "express";
import passport from "passport";
import { authLog, userInfo } from "../services/user.services.js";
import {allProdsObj} from "../services/product.services.js";
import {cartdata, totalCart} from "../services/cart.services.js";

const router=Router();
const style="style1.css"

router.get('/',passport.authenticate('jwt',{session:false, failureRedirect:"/log"}), async (req, res) => {
    const userLog=userInfo(req.user.user)
    res.render('index',{style,userLog})
    
});

router.get('/log', async (req, res) => {

    res.render('login',{style});
});


router.get('/singup', async (req, res) => {

    res.render('singup',{style});
});

router.get('/allproducts',passport.authenticate('jwt',{session:false, failureRedirect:"/log"}),authLog(["admin","user"]), async (req, res) => {
    const allProdMap = await allProdsObj()
    console.log(allProdMap)
    res.render('allprod',{style,allProdMap})
    })



router.get('/realTimeProducts',passport.authenticate('jwt',{session:false, failureRedirect:"/"}),authLog(["admin","user"]), (req, res) => {
    res.render('realTimeProducts',{style})
})

router.get('/message', (req, res) => {

    res.render('message',{style})
})

router.get('/cart',passport.authenticate('jwt',{session:false, failureRedirect:"/"}),authLog(["user"]),async(req, res) => {
    const cart =await cartdata(req.user.user.cartId)
    const total = await totalCart(cart)
    const purchase= `/api/carts/${req.user.user.cartId}/purchase`
    req.user=req.user.user
    res.render('cartId',{style,cart,total,purchase})
    })

router.get("/createproduct",passport.authenticate('jwt',{session:false, failureRedirect:"/"}),authLog(["admin"]), (req, res) => {
    res.render("createProd",{style})

})

export default router;