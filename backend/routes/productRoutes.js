import express from 'express'
import Product from '../models/productModel.js'
const router = express.Router()

import asyncHandler from 'express-async-handler'

// @desc    请求所有产品
// @route   GET /api/products
// @access  公开的
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

// @desc    请求单个产品
// @route   GET /api/products/:id
// @access  公开的
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('产品查询不到！')
    }
  })
)

export default router
