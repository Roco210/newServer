export const erroMiddleware=(error,req,res,next)=>{
    res.send({
        status:"error",
        message:error.message,
    })
}