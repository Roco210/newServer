import Router from 'express';
import {generateProduct} from "../utils.js"
const router = Router();

router.get('/',(req,res)=>{
    const fakeProducts=[]
    for (let i = 0; i < 100; i++) {
        fakeProducts.push(generateProduct())
    }
    res.json(fakeProducts) 
})

export default router;
