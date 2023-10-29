import mongoose, { Schema } from "mongoose";

const Category = mongoose.model("Category", new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, unique: true },
  description: String,
}, { timestamps: true }
));

export default Category