//creating a middleware/wrapper for async functions to handle errors globally
const asyncHandler=(fn)=>async(req,res,next)=>{

    try {
        await fn(req,res,next);
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        })
        next(error);
    }

}


export {asyncHandler}