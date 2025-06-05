import User from "../models/user.model.js";
import Form from "../models/form.model.js";
import mongoose from "mongoose";

const saveForm = async (req, res) => {
  const { createdBy, formId, ...restFormData } = req.body;

  try {
    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newForm = new Form({
      ...restFormData,
      createdBy,
      formId: formId || new mongoose.Types.ObjectId().toString(),
    });

    await newForm.save();

    res.status(200).json({ message: "Form saved", formId: newForm.formId });
  } catch (error) {
    console.error("Form save error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getForm = async (req, res) => {
  const { formId } = req.params;

  try {
    // find form by formId and createdBy userId
    const form = await Form.findOne({ formId });
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error("Get form error:", error);
    res.status(500).json({ error: error.message });
  }
};

export {
  saveForm,
  getForm,
};
