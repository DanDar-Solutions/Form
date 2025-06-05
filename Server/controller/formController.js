import User from "../models/user.model.js";
import mongoose from "mongoose";

const saveForm = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add _id manually to the formData before pushing
    const newForm = {
      ...formData,
      _id: new mongoose.Types.ObjectId()
    };

    user.forms.push(newForm);
    await user.save();

    res.status(200).json({ message: "Form saved", formId: newForm._id });
  } catch (error) {
    console.error("Form save error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getForm = async (req, res) => {
    const { userId, formId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(formId)) {
        return res.status(404).json({ error: "Invalid form ID" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const form = user.forms.find(form => form._id.toString() === formId);
        if (!form) {
            return res.status(404).json({ error: "Form not found" });
        }

        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
  saveForm,
  // editForm, 
  // deleteForm ,
};
