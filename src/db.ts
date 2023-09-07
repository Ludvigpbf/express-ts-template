import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

let mongoURI: string;

if (process.env.NODE_ENV === "production") {
  // Use the production connection string for MongoDB Atlas
  mongoURI = process.env.MONGODB_URI || "";
} else {
  // Use the local connection string for development
  mongoURI = "mongodb://127.0.0.1:27017/your-db-name";
}

// Establish a connection to your local MongoDB and add a name for your database
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Export the mongoose instance for use in other parts of your application
export default mongoose;
