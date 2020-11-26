import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB数据库：${conn.connection.host}`)
  } catch (error) {
    console.log(`错误：${error.message}`)
    process.exit(1)
  }
}

export default connectDB
