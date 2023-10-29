import Product from "../models/Product.js";
import axios from "axios"
import fs from 'fs';
import Image from "../models/Image.js";
import mongoose from "mongoose";
import Comment from "../models/Comment.js";
const createProduct = async ({ name, price, images = [], category, comments = [] }) => {
  try {
    const imageDocs = [];
    const imageDirectory = 'public/images';
    if (!fs.existsSync(imageDirectory)) {
      fs.mkdirSync(imageDirectory, { recursive: true });
    }
    console.log(images[0]);
    for (let i = 0; i < images.length; i++) {

      const imageUrl = images[i].url;
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const base64Image = Buffer.from(response.data, 'binary').toString('base64');
      const timestamp = new Date().getTime();
      const filename = `image_${timestamp}_${i}.png`;
      fs.writeFileSync(`public/images/${filename}`, base64Image, 'base64');
      const image = new Image({
        url: `public/images/${filename}`,
        caption: images[i].caption,
      });
      await image.save();

      imageDocs.push(image);
    }
    console.log(imageDocs);
    const product = new Product({
      name: name,
      price: price,
      category: category,
      images: imageDocs,
    });

    // Lưu sản phẩm vào cơ sở dữ liệu
    const savedProduct = await product.save();
    return savedProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error(error.message);
  }
};
const getProduct = async (req) => {
  try {
    let { page, limit, sortColumn, sortDirection, searchText } = req.query;


    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    const sort = {};
    sort[sortColumn] = sortDirection === 'asc' ? 1 : -1;
    const filter = {
      $or: [
        { name: { $regex: searchText, $options: 'i' } },
      ],
    };

    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("images comment category")

    const totalProducts = await Product.countDocuments(filter);

    return {
      data: products,
      total: totalProducts,
    };
  } catch (err) {
    console.error(err);
    throw new Error({ error: 'Internal Server Error' });
  }
}
const createComment = async (productId, commentData) => {
  try {
    const product = await Product.findOne({ _id: productId }).populate("category").exec();
    if (!product) {
      throw new Error("Product not found");
    }

    const newComment = await Comment.create({
      userId: commentData.userId,
      text: commentData.text
    });

    product.comment.push(newComment);

    await product.save();

    const updatedProduct = await Product.findById(productId).populate('comment images category').exec();

    console.log(updatedProduct);

    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getComment(productId) {
  try {
    const newProduct = await Product.findOne({ _id: productId }).exec();
    return newProduct.comment;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getProductById(productId) {
  try {
    const newProduct = await Product.findOne({ _id: productId })
      .populate("images category comment")
      .exec();

    return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default {
  createProduct,
  getProduct,
  createComment,
  getComment,
  getProductById,
};
