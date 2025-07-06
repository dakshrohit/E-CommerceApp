import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errorHandler.js';
import { authRouter } from './routes/auth.routes.js';
import { userRouter } from './routes/user.routes.js';
import { cartRouter } from './routes/cart.routes.js';
import { productRouter } from './routes/product.routes.js';
import { orderRouter } from './routes/order.routes.js';
import { paymentRouter } from './routes/payment.routes.js'; // Import payment routes
const app = express();

//cors setup
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


//middleware setup
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static('public'));
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});


console.log("i m before routes")
//ROUTES
app.use('/api/auth', authRouter); //auth routes for login, signup, logout 
app.use('/api/user', userRouter); //user routes for profile 
app.use('/api/cart',cartRouter); //cart routes for managing cart items
app.use('/api/products',productRouter )//product routes for managing products
app.use('/api/orders',orderRouter) //order routes for managing orders
app.use('/api/payment',paymentRouter) //payment routes for managing payments
//404 error handling middleware
app.use((req,res,next)=>{
    res.status(404).json({
        success:false,
        message:"Route not found",
    })
})

// Error handling middleware
app.use(errorHandler) //should be the last middleware after all routes and controllers
export {app}