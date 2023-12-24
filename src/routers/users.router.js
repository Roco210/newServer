import Router from "express";
import passport from "passport";
import { Singup, userLogIn, userLogOut,forgotPassword,createNewPass} from "../controllers/users.controler.js";
import { checkData,changePass,checklink } from "../services/user.services.js";
import { erroMiddleware } from "../errors/error.middleware.js";
import {newCart} from "../services/cart.services.js"
const router = Router();


router.post('/',checkData,newCart, Singup)

router.post("/login",passport.authenticate('local',{failureRedirect: '/singup'}), userLogIn,erroMiddleware)

router.post("/forgotpassword",changePass, forgotPassword)

router.get("/modifylinkpass/:jwt",checklink,)

router.post("/newpass",createNewPass)

router.get("/logout", userLogOut)

router.get("/githubSingUp",passport.authenticate('github', { scope: [ 'user:email' ] }))

router.get("/github", passport.authenticate('github', { failureRedirect: '/singup' }),userLogIn)

export default router;

