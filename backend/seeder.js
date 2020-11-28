import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

//插入数据到数据库
const importData = async () => {
  try {
    //初始化清空内容
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    //插入数据
    const createdUser = await User.insertMany(users)
    const adminUser = createdUser[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)
    console.log('样本数据已经实现存储！'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

//销毁数据库中的数据
const destroyData = async () => {
  try {
    //初始化清空内容
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('样本数据已被销毁！'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}
//判断是销毁还是保存数据
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
