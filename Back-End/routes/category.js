import express from 'express'
import {categoryController} from '../controllers/index.js'

const categoryRouter = express.Router()

// categoryRouter.get('/', productController.getAllProducts)

categoryRouter.post('/', categoryController.createCategory)

categoryRouter.get('/', categoryController.getCategory)
export default categoryRouter