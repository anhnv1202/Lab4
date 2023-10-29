import { productRepository } from "../repositories/index.js";

async function getAllProducts(req, res) {
  try {
    const result = await productRepository.getProduct(req);
    if (!result)
      res.status(500).json({
        message: "Create product false",
      });
    else
      res.status(200).json({
        message: "List of products",
        data: result,
      });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
}
async function getProductbyId(req, res) {
  try {
    const id = req.params.id;
    const result = await productRepository.getProductById(id);
    if (!result)
      res.status(500).json({
        message: "Create product false",
      });
    else
      res.status(200).json({
        message: "List of products",
        data: result,
      });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
}
async function createProduct(req, res) {
  try {

    const { name, price, images, category, comments, captions } = req.body;
    for (let i = 0; i < images.length; i++) {
      images[i] = {
        url: images[i],
        caption: captions[i],
      };
    }
    const result = await productRepository.createProduct({
      name,
      price,
      images: images,
      category,
      comments,
    });
    if (!result)
      res.status(500).json({
        message: "Create product false",
      });
    else
      res.status(200).json({
        message: "Products Created",
        data: result,
      });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
}
async function createComment(req, res) {
  const { productId } = req.params;
  const userId = req?.user?.userId || 1;
  const text = req.body.text;
  if (!text) {
    res.status(400).json({
      message: "Invalid input",
    });
    return;
  }
  const commentData = {
    userId,
    text: req.body.text,
  };

  try {
    const result = await productRepository.createComment(
      productId,
      commentData
    );
    if (!result)
      res.status(500).json({
        message: "Create comment false",
      });

    res.status(200).json({
      message: "Comment Created",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
}
async function getComment(req, res) {
  const { productId } = req.params;
  try {
    const result = await productRepository.getComment(productId);
    if (!result)
      res.status(500).json({
        message: "Get comment false",
      });
    else
      res.status(200).json({
        message: "Get Comment Success",
        data: result,
      });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
}
export default {
  getAllProducts,
  createProduct,
  createComment,
  getComment,
  getProductbyId,
};
