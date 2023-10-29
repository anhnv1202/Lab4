import Category from '../models/Category.js'

async function createCategory({ name, description }) {
    try {
        const newCategory = await Category.create({ name, description });
        return newCategory;
    } catch (error) {
        throw new Error(error.message);
    }
}
async function getCategory() {
    try {
        const newCategory = await Category.find({ });
        return newCategory;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default {
    createCategory,getCategory
}