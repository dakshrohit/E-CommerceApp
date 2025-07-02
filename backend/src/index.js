import connectDB from "./db/index.js";

// import 'dotenv/config'
import dotenv from 'dotenv';

dotenv.config({ path: './.env' }); // Load environment variables from .env file
// dotenv.config();
connectDB();