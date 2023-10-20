import Router from 'express';
import { paginateAllProd, SerchProdbyID, createProd,deleteProd, modifyProd} from '../controllers/products.controllers.js';
import { authLog } from "../services/user.services.js";

const router = Router();

router.get('/',paginateAllProd)

router.get('/:pid', SerchProdbyID)

router.post('/',authLog(["admin"]), createProd )

router.put('/:pid',authLog(["admin"]), modifyProd )

router.delete('/:pid', authLog(["admin"]),deleteProd)

export default router;
