import connectDB from "./db/index.js";


// import 'dotenv/config'
import dotenv from "dotenv";
import {app} from "./app.js"; // Import the Express app

dotenv.config({ path: "./.env" }); // Load environment variables from .env file
// dotenv.config();
connectDB() //returns a promise
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  });
