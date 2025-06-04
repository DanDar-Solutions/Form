import User from "../models/user.model.js";
import mongoose from "mongoose";

const saveForm = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;
  console.log(formData)
  console.log(id)

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.forms.push(formData);
    await user.save();

    res.status(200).json({ message: "Form saved", forms: user.forms });
  } catch (error) {
    console.error("Form save error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  saveForm,
//  getForm,
//   getFormById,
};
