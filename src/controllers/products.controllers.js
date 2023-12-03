
import {productMongo} from "../DAL/DAO/manager/product/productManagerMongo.js"
import CustomError from "../errors/CustomError.js"
import { ErrorMessages } from "../errors/error.enum.js"


export const paginateAllProd =async(req,res)=>{
    const {limit=10,page=1,sortPrice,...query} =req.query
    try{
        const products = await productMongo.getproducts(limit,page,query,sortPrice)
        res.status(200).json(products)
    }
    catch(error){res.status(500).json({error})}
}

export const SerchProdbyID = async(req,res)=>{
    const {pid}= req.params
    if (pid.length!= 24){
        res.status(400).json({mesage:`Use a correct Id`})
        return} 
    try{
        /* */
        const prodById= await productMongo.getproductById(pid)
        if (!prodById || prodById.name== "CastError"){
            throw CustomError.createError(ErrorMessages.PRODUCT_NOT_FUND)
        }else{
            res.status(200).json({mesage:"product: ", prodById})
        }
    }catch(error){
        CustomError.createError(ErrorMessages.PRODUCT_NOT_FUND)
        
    }
}

export const createProd = async(req,res)=>{
    const {title, description, price, thumbnail, code, stock, category, status}=req.body
    if(!title || !description || !price  || !stock || !code || !category){

        res.status(400).json({mesage:'ERROR: Not all data is complete'})
    }
    try{
        const newProd = await productMongo.createProduct(req.body)
        res.status(200).json({mesage:"New product: ", newProd})}
    catch(error){res.status(500).json({error})}
}

export const modifyProd =async(req,res)=>{
    const pid= req.params.pid
    const prod = req.body
    if (pid.length != 24){
        res.status(400).json({mesage:`Use a correct Id`})
        return}
    const prodById= await productMongo.getproductById(pid)
    if (!prodById || prodById.name== "CastError"){
        res.status(500).json({mesage:"No product exists"})
        return}
    try{
        const mod= await productMongo.updateProduct(pid,prod)
        if (!mod){
            res.status(400).json({mesage:`No product exists whit the ID: ${pid}`})
        }else{
            res.status(200).json({mesage:"product modify"})}
    }
    catch(error){
        
        res.status(500).json({error})}
}

export const deleteProd = async(req,res)=>{
    const pid = req.params.pid
    if (pid.length != 24){
        res.status(400).json({mesage:`Use a correct Id`})
        return}
    try{
        const del = await productMongo.deleteProduct(pid)
        if (!del|| del.name== "CastError"){
            res.status(400).json({mesage:"the id no exists"})
        }else {res.status(200).json({mesage:"the product was delete"})
    }}
    catch(error){res.status(500).json({error})}
}