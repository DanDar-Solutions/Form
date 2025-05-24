import User from "../models/user.model.js";
import mongoose from "mongoose";

//  get all user
const allUsers = async (req, res) => {
    try {
      const users = await User.find({}).sort({ createdAt: -1 });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

//  get single user
const getUser = async (req,res) =>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid user ID" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//  create new user
const createUser = async (req,res) =>{
    const {name ,email ,password} = req.body

    try{
        const user = await User.create({name,email,password})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//  delete new user
const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid user ID" });
    }
  
    try {
      const user = await User.findOneAndDelete({ _id: id });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

//  update user

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', name: user.name, id: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createUser, allUsers, getUser, deleteUser, updateUser, loginUser };
 