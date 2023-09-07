import express from "express";
import cors from "cors";
import mongoose from "./db";

import userRouter from "./routes/userRoutes";

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
// Use the express.urlencoded middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// CORS middleware for handling cross-origin requests
app.use(cors());
const port = 3000;

// Use the database connection in here
mongoose;

app.listen(port, () => {
  console.log(`running on port ${port}`);
});

// Define your routes
app.use("/auth", userRouter);

// Error handling middleware (place it after your routes)
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);
