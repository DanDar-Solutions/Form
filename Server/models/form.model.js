import mongoose from "mongoose";


const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [],
  formId: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},{ timestamps: true });

const Form = mongoose.model("Form", formSchema, "forms");
export default Form;