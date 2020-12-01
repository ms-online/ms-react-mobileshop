import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

// @desc    用户身份认证 & 获取token
// @route   POST /api/uses/login
// @access  公开的
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    })
  } else {
    res.status(401)
    throw new Error('邮箱或者密码错误')
  }
})

export { authUser }
