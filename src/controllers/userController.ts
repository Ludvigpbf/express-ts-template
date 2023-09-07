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
