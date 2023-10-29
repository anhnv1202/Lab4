import express from 'express'
import {productController} from '../controllers/index.js'
import checkToken from '../auth/authentication.js'

const productRouter = express.Router()

productRouter.get('/', productController.getAllProducts)

productRouter.get('/:id', productController.getProductbyId)

productRouter.post('/', productController.createProduct)

productRouter.post('/:productId/comment',checkToken, productController.createComment)

export default productRouter