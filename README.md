# Express Template with TypeScript, Cors and Nodemon

## To simply clone the template, clone it to your machine and write in the terminal: npm i and npm i --save-dev

## Instructions:

1.  **Make your way in the terminal to where you want to create your project and go into it:**
    - mkdir your-express-app && cd your-express-app<br><br>
2.  **Initialise the express project:**
    - npm init -y<br><br>
3.  **Install dependencies:**
    - npm i bcrypt express cors typescript ts-node nodemon mongoose dotenv --save<br><br>
4.  **Install devDependencies:**
    - npm i --save-dev @types/mongoose @types/cors @types/express @types/bcrypt @types/node<br><br>
5.  **Initialise TypeScript and create a tsconfig.json file with:**
    - npx tsc --init<br><br>
6.  **Update tsconfig.json to match:**

    ```
    {
    "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules"]
    }
    ```

7.  **Create and go into the src folder:**
    - mkdir src
    - cd src<br><br>
8.  **Create all the basic files and folders:**
    - mkdir models controllers routes
    - touch server.ts db.ts .env
    - cd models
      - touch User.ts
      - cd ..
    - cd controllers
      - touch userController.ts
      - cd ..
    - cd models
      - touch userRoutes.ts
      - cd ..<br><br>
9.  **Create a readme file:**
    - touch README.md<br><br>
10. **Directory structure should look like this:**

    ```
    |---node_modules
    |---src
    | |---controllers
    |   |---userController.ts
    | |---models
    |   |---User.ts
    | |---routes
    |   |---userRoutes.ts
    | |---db.ts
    | |---server.ts
    |---.env
    |---package-lock.json
    |---package.json
    |---README.md
    |---tsconfig.json
    ```

11. **Create the app in server.ts:**

    ```
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

    ```

12. **In the .env file, add your variables:**

    ```
    PORT=3000
    MONGODB_URI=mongodb+srv://<username>:<password>@<your-cluster>/
    SECRET_KEY=mysecretkey
    NODE_ENV="development"
    ```

13. **In the db.ts file, make your connection:**

    ```
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

    ```

14. **In userController.ts add this:**

    ```
    import { Request, Response } from "express";
    import { UserModel } from "../models/User"; // Import the User model

    // Create a new user
    export const createUser = async (req: Request, res: Response) => {
    // Create a new user using the UserModel and request body data
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
    };

    // Read all users
    export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    };

    // Read a single user by ID
    export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    };

    // Read a single user by username
    export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    };

    // Update a user by ID
    export const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, username, email, password } = req.body;

    try {
        const user = await UserModel.findByIdAndUpdate(
        id,
        { username, email, password },
        { new: true }
        );

        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    };

    // Delete a user by ID
    export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findByIdAndDelete(id);

        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    };


    ```

15. **In User.ts add this:**

    ```
    import mongoose from "mongoose";
    import bcrypt from "bcrypt";

    const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    });

    // Hash the password before saving
    UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error as Error);
    }
    });

    export const UserModel = mongoose.model("User", UserSchema);


    ```

16. **In userRoutes.ts add this:**

    ```
    import express from "express";
    import {
    createUser,
    getAllUsers,
    getUserByUsername,
    getUserById,
    updateUserById,
    deleteUserById,
    } from "../controllers/userController";

    const userRouter = express.Router();

    userRouter.post("/user", createUser);
    userRouter.get("/users", getAllUsers);
    userRouter.get("/user/:id", getUserById);
    // Get user by username:
    // userRouter.get("/user/:username", getUserByUsername);
    userRouter.put("/user/:id", updateUserById);
    userRouter.delete("/user/:id", deleteUserById);

    export default userRouter;


    ```

17. **Use www.mockaroo.com to generate dummy data for the database with this setup**
    | Field Name | Description |
    |------------|-------------------|
    | firstName | First Name |
    | lastName | Last Name |
    | username | Username |
    | email | Email Address |
    | password | Password Hash |
