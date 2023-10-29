import { categoryRepository } from "../repositories/index.js";

async function createCategory(req, res) {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        message: "Invalid input",
      });
      return;
    }
    const result = await categoryRepository.createCategory({
      name,
      description,
    });

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
      erros: error.toString(),
    });
  }
}
async function getCategory(req, res) {
  try {
    const result = await categoryRepository.getCategory();

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
      erros: error.toString(),
    });
  }
}
export default {
  createCategory,
  getCategory,
};
