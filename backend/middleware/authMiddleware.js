import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token
  //   console.log(req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
      console.log(decoded)
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('没有授权，token获取失败')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('没有权限，没有token')
  }
})

export { protect }
