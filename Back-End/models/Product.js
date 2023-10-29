import mongoose, {ObjectId, Schema} from "mongoose";
import {Image, Comment, Category} from "./index.js";
const Product = mongoose.model("Product", new Schema({
  id: { type: ObjectId },
  name: {type:String,unique:true},
  price: Number,
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image"
    }
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
},
{
  timestamps: true,
}));


export default Product;
