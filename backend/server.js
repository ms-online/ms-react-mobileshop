const express = require('express')
const products = require('./data/products')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('API正在运行......')
})
app.get('/api/products', (req, res) => {
  res.json(products)
})
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`服务器正在${process.env.NODE_ENV}模式下的${PORT}端口号运行`)
)
