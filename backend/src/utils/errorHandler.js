const errorHandler=(err,req,res,next)=>{
    if(res.headersSent){
        return next(err)
    }
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message,
        errors:err.errors || [],
        stack:process.env.NODE_ENV==="production" ? null : err.stack
    });
}

export {errorHandler};