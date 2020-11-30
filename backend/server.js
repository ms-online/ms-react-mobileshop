import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()
const app = express()

app.get('/', (req, res) => {
  res.send('API正在运行......')
})

app.use('/api/products', productRoutes)

app.use(notFound)

//自定义错误处理中间件
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `服务器正在${process.env.NODE_ENV}模式下的${PORT}端口号运行`.yellow.bold
  )
)
