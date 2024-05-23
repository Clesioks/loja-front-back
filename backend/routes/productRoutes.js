import express from 'express'
const router = express.Router()
import { getProducts, getProductById, createProduct, updatedProduct, deleteProduct } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'



router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).put(protect, admin, updatedProduct).delete(protect, admin, deleteProduct)


 
export default router 