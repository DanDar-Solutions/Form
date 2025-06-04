import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: []
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  forms: [formSchema]
});

const User = mongoose.model("User", userSchema);
export default User;
