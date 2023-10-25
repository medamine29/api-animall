import express, { json } from 'express';
const dotenv = require('dotenv').config()
const cors = require('cors');
import mongoose from 'mongoose'
import errorHandler from './middlewares/errors';
import userRouter from './routes/user.routes';
import productRouter from './routes/product.routes';
import orderRouter from './routes/order.routes';
import topicRouter from './routes/topic.routes';

const app = express()
const PORT = process.env.PORT || 3000
const mongoURI = process.env.mongoURI

mongoose.connect(mongoURI)
  .then(()=>{ console.log("db connected"); })
  .catch((err)=> console.log(err));

app.use(json())
app.use(cors())
app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)
app.use('/topics', topicRouter)

// Error Handling
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`server up and running on port : ${PORT}`)
})